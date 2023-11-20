import express from 'express'
import { readFileSync } from 'node:fs'

const app = express()

const tours = JSON.parse(readFileSync('./backend/data/tours-simple.json'))

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  })
})

const port = 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
