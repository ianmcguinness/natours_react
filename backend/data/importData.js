import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './db.js'
import { readFileSync } from 'node:fs'
import Tour from '../models/Tour.js'

dotenv.config()

// Read JSON file

const tours = JSON.parse(
  readFileSync('./backend/data/tours-simple.json', 'utf-8')
)

connectDB()

// Import data into DB

const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data successfully loaded')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

// Delete all data from DB

const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('Data successfully deleted')
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

if (process.argv[2] === '-i') importData()
else if (process.argv[2] === '-d') deleteData()
else console.log('Please pass the correct flag')
