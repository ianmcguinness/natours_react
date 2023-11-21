import { readFileSync, writeFile } from 'node:fs'

let tours = JSON.parse(readFileSync('./backend/data/tours-simple.json'))

// Get All Tours
export const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
    requestedAt: req.requestTime
  })
}

// Get Tour By Id
export const getTourById = (req, res) => {
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
export const createTour = (req, res) => {
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
export const updateTour = (req, res) => {
  if (Number(req.params.id) > tours.length)
    return res.status(400).json({ status: 'fail', message: 'Invalid ID' })
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated Tour Here>' } })
}

// Delete Tour By Id
export const deleteTour = (req, res) => {
  if (Number(req.params.id) > tours.length)
    return res.status(400).json({ status: 'fail', message: 'Invalid ID' })
  res.status(204).json({ status: 'success', data: null })
}
