const { Client } = require('pg');

async function checkTables() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL || 'postgresql://bobur@localhost:5432/lawprep?schema=public',
    });

    try {
        await client.connect();
        console.log('Connected to database');

        const res = await client.query(
            "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
        );

        console.log('Tables in public schema:');
        res.rows.forEach(row => console.log('-', row.table_name));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

checkTables();
