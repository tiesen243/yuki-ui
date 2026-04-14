import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '@/server/prisma/generated/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const db = new PrismaClient({ adapter })

export { db }
