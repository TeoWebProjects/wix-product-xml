import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'

import * as dotenv from 'dotenv'

import { getProducts, exportToXml, filterProducts } from './helpers.js'

dotenv.config()
const app = express()
app.use(express.static('./public'))
app.use(cors())

app.get('/makexml', async function (req, res) {
  const allProducts = await getProducts()
  if (allProducts === undefined || allProducts.length <= 0) return res.status(500).json({ message: 'Κάτι πήγε στραβά με το Wix API.' })
  const products = filterProducts(allProducts)
  if (products.length <= 0) return res.status(500).json({ message: 'Δεν βρέθηκαν προϊόντα!' })
  const xmlProducts = exportToXml(products)
  if (xmlProducts === undefined) return res.status(500).json('Κάτι πήγε στραβά με το Xml.')

  fs.writeFile('./public/skroutz_feed.xml', xmlProducts, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).json('Κάτι πήγε στραβά με το ανέβασμα του αρχείου.')
    }
  })
  return res.status(200).json('To Xml δημιουργήθηκε επιτυχώς!')
})

app.listen(5000, console.log(`Server is running on port 5000`))
