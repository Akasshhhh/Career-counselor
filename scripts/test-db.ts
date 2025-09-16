// scripts/test-db-connection.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    // Test the connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Try a simple query
    const userCount = await prisma.user.count()
    console.log(`📊 Total users in database: ${userCount}`)
  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()