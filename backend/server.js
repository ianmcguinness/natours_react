import mongoose from 'mongoose'
import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongo DB Connected - ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
  }
}

connectDB()

// Start Server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
