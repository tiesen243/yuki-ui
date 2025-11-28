import { PrismaClient } from '@/server/prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const {
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = '5432',
  POSTGRES_USER = 'yuki-auth',
  POSTGRES_PASSWORD = 'securepassword',
  POSTGRES_DB = 'db',
  NODE_ENV,
} = process.env

const createPrismaClient = () => {
  const adapter = new PrismaPg({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT, 10),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  })
  return new PrismaClient({ adapter })
}
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}
export const db = globalForPrisma.prisma ?? createPrismaClient()
if (NODE_ENV !== 'production') globalForPrisma.prisma = db
