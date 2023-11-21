import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.NODE_ENV)

// Start Server
const port = 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
