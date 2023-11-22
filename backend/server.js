import mongoose from 'mongoose'
import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './data/db.js'

dotenv.config()

connectDB()

// Start Server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
