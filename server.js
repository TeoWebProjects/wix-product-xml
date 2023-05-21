import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.use(express.static('./public'))

app.get('/', function (req, res) {
  res.send('Test Server!')
})

app.post('/makexml', function (req, res) {
  res.json(req.body)
})

app.listen(5000, console.log(`Server is running on port 5000`))
