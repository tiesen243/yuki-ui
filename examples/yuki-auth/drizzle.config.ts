import { defineConfig } from 'drizzle-kit'

const {
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = '5432',
  POSTGRES_USER = 'yuki-auth',
  POSTGRES_PASSWORD = 'securepassword',
  POSTGRES_DB = 'db',
  NODE_ENV,
} = process.env

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT, 10),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  },

  casing: 'snake_case',
  schema: './server/drizzle/schema.ts',
  strict: true,
  verbose: true,
})
