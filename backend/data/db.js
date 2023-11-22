import mongoose from 'mongoose'

export default async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongo DB Connected - ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
  }
}
