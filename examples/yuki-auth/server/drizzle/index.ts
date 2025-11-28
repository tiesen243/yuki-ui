import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const {
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = '5432',
  POSTGRES_USER = 'yuki-auth',
  POSTGRES_PASSWORD = 'securepassword',
  POSTGRES_DB = 'db',
  NODE_ENV,
} = process.env

const createDrizzleClient = () => {
  const conn = new Pool({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT, 10),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  })
  return drizzle(conn, { casing: 'snake_case' })
}
const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}
export const db = globalForDrizzle.db ?? createDrizzleClient()
if (NODE_ENV !== 'production') globalForDrizzle.db = db
