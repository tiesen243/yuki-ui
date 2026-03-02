import mongoose from 'mongoose'

const { DATABASE_URL } = process.env

export async function connectDB() {
  if (!DATABASE_URL)
    throw new Error('Please define the MONGODB_URI environment variable')

  await mongoose.connect(DATABASE_URL)
  return mongoose
}
