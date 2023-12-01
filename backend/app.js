import express from 'express'
import morgan from 'morgan'
import tourRoutes from './routes/tourRoutes.js'
import userRoutes from './routes/userRoutes.js'
import AppError from './utils/AppError.js'
import ErrorHandler from './controllers/errorController.js'

const app = express()

// Middleware

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes

app.use('/api/v1/tours', tourRoutes)
app.use('/api/v1/users', userRoutes)

// 404 Handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404))
})

app.use(ErrorHandler)

export default app
