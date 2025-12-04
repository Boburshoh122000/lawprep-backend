import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@lawprep.uz';
    // Hash provided by user: $2a$12$M3coeS8YdQzjIGV/J8L0w0OJYIYN1tfHQ1xETWPI1Y2YPasi/JubG (admin123)
    const passwordHash = '$2a$12$M3coeS8YdQzjIGV/J8L0w0OJYIYN1tfHQ1xETWPI1Y2YPasi/JubG';

    console.log('🌱 Seeding admin user...');

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: passwordHash,
            role: 'ADMIN',
            isPremium: true,
            coins: 9999,
        },
        create: {
            email,
            password: passwordHash,
            name: 'Super Admin',
            role: 'ADMIN',
            isPremium: true,
            coins: 9999,
        },
    });

    console.log(`
✅ Admin user seeded!
--------------------------------
Email:    ${email}
Password: admin123
--------------------------------
`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
