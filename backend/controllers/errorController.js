import AppError from '../utils/AppError.js'

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    })
  } else if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') {
      const message = `Invalid ${err.path}: ${err.value}`
      err.isOperational = true
      new AppError(message, 400)
    }
    if (err.code === 11000) {
      const message = `Duplicate field value: ${err.errmsg.match(/([^"]*)/)[0]}`
      err.isOperational = true
      new AppError(message, 400)
    }
    if (err.name === 'ValidationError') {
      const message = 'Invalid input data'
      err.isOperational = true
      new AppError(message, 400)
    }
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      })
    } else {
      console.error(err)
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      })
    }
  }
}
