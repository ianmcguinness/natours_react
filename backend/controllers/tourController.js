import Tour from '../models/Tour.js'

// Get All Tours
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }
}

// Get Tour By Id
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: { tour }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Tour not found'
    })
  }
}

// Create New Tour
export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body)
    res.status(201).json({
      status: 'success',
      data: { tour }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    })
  }
}

// Update Tour By Id
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: 'success',
      data: { tour }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    })
  }
}

// Delete Tour By Id
export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Tour not found'
    })
  }
}
