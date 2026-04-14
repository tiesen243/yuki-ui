import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const createDrizzleClient = () => {
  const conn = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  return drizzle(conn, { casing: 'snake_case' })
}
const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}
export const db = globalForDrizzle.db ?? createDrizzleClient()
if (process.env.NODE_ENV !== 'production') globalForDrizzle.db = db
