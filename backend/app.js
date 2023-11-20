import express from 'express'
import { readFileSync, writeFile } from 'node:fs'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let tours = JSON.parse(readFileSync('./backend/data/tours-simple.json'))

// Get All Tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  })
}

// Get Tour By Id
const getTourById = (req, res) => {
  const id = Number(req.params.id)
  const tour = tours.find(tour => tour.id === id)
  if (!tour)
    return res.status(400).json({ status: 'fail', message: 'Invalid ID' })
  res.status(200).json({
    status: 'success',
    data: { tour }
  })
}

// Create New Tour
const createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1
  const tour = { id, ...req.body }
  tours = [...tours, tour]
  writeFile('./backend/data/tours-simple.json', JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: { tour }
    })
  })
}

// Update Tour By Id
const updateTour = (req, res) => {
  if (Number(req.params.id) > tours.length)
    return res.status(400).json({ status: 'fail', message: 'Invalid ID' })
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated Tour Here>' } })
}

// Delete Tour By Id
const deleteTour = (req, res) => {
  if (Number(req.params.id) > tours.length)
    return res.status(400).json({ status: 'fail', message: 'Invalid ID' })
  res.status(204).json({ status: 'success', data: null })
}

app.route('/api/v1/tours').get(getAllTours).post(createTour)

app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour)

const port = 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
