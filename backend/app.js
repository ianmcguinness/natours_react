import express from 'express'
import morgan from 'morgan'
import tourRoutes from './routes/tourRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

// Middleware

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes

app.use('/api/v1/tours', tourRoutes)
app.use('/api/v1/users', userRoutes)

export default app
