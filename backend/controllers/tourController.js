import Tour from '../models/Tour.js'

// Check Body
export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res
      .status(400)
      .json({ status: 'fail', message: 'Missing name or price' })
  next()
}

// Get All Tours
export const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
    requestedAt: req.requestTime,
  })
}

// Get Tour By Id
export const getTourById = (req, res) => {
  const id = Number(req.params.id)
  const tour = tours.find((tour) => tour.id === id)
  res.status(200).json({
    status: 'success',
    data: { tour },
  })
}

// Create New Tour
export const createTour = async (req, res) => {
  const newTour = {
    name: 'The Park Camper',
    price: 997,
  }
  try {
    const tour = await Tour.create(newTour)
    res.status(201).json({
      status: 'success',
      data: { tour },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    })
  }
}

// Update Tour By Id
export const updateTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated Tour Here>' } })
}

// Delete Tour By Id
export const deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null })
}
