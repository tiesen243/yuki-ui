import mongoose from 'mongoose'

const {
  MONGODB_HOST = 'localhost',
  MONGODB_PORT = '27017',
  MONGO_INITDB_ROOT_USERNAME = 'yuki-auth',
  MONGO_INITDB_ROOT_PASSWORD = 'securepassword',
  MONGODB_DB = 'db',
  NODE_ENV,
} = process.env

import * as schema from './schema'

const createMongooseClient = () => {
  const uri = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`

  void mongoose.connect(uri, {
    dbName: MONGODB_DB,
    ssl: NODE_ENV === 'production',
  })

  return schema
}
const globalForMongoose = globalThis as unknown as {
  mongooseClient: typeof schema | undefined
}
export const db = globalForMongoose.mongooseClient ?? createMongooseClient()
if (NODE_ENV !== 'production') globalForMongoose.mongooseClient = db
