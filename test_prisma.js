const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

async function testPrisma() {
    const connectionString = process.env.DATABASE_URL || 'postgresql://bobur@localhost:5432/lawprep?schema=public';
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool, { schema: 'public' });
    const prisma = new PrismaClient({ adapter });

    try {
        console.log('Testing Prisma connection...');
        const courses = await prisma.course.findMany();
        console.log('Success! Found courses:', courses);
    } catch (err) {
        console.error('Error:', err.message);
        console.error('Full error:', err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

testPrisma();
