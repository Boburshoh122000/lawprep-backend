import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const admin = await prisma.user.upsert({
        where: { email: 'admin@lawprep.uz' },
        update: {},
        create: {
            email: 'admin@lawprep.uz',
            name: 'Admin User',
            role: 'ADMIN',
            isPremium: true,
            coins: 1000,
        },
    });
    console.log('✅ Created admin user:', admin.email);

    // Create student user
    const student = await prisma.user.upsert({
        where: { email: 'student@test.com' },
        update: {},
        create: {
            email: 'student@test.com',
            name: 'Test Student',
            role: 'STUDENT',
            isPremium: false,
            coins: 100,
        },
    });
    console.log('✅ Created student user:', student.email);

    // Create courses
    const course1 = await prisma.course.upsert({
        where: { id: 'course-1' },
        update: {},
        create: {
            id: 'course-1',
            name: 'Constitutional Law Basics',
            grade: '8',
            description: 'Introduction to constitutional law and fundamental rights',
            isActive: true,
        },
    });

    const course2 = await prisma.course.upsert({
        where: { id: 'course-2' },
        update: {},
        create: {
            id: 'course-2',
            name: 'Criminal Law Fundamentals',
            grade: '9',
            description: 'Understanding criminal law principles and procedures',
            isActive: true,
        },
    });
    console.log('✅ Created courses');

    // Create lessons for course 1
    await prisma.lesson.upsert({
        where: { id: 'lesson-1' },
        update: {},
        create: {
            id: 'lesson-1',
            title: 'Introduction to Constitution',
            courseId: course1.id,
            order: 1,
            videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
            content: 'The constitution is the supreme law of the land. It establishes the framework of government and guarantees certain rights to citizens.',
            isActive: true,
        },
    });

    await prisma.lesson.upsert({
        where: { id: 'lesson-2' },
        update: {},
        create: {
            id: 'lesson-2',
            title: 'Fundamental Rights',
            courseId: course1.id,
            order: 2,
            videoUrl: 'https://www.youtube.com/watch?v=3kQRKhvxh34',
            content: 'Fundamental rights are basic human rights enshrined in the constitution to protect citizens from government overreach.',
            isActive: true,
        },
    });

    await prisma.lesson.upsert({
        where: { id: 'lesson-3' },
        update: {},
        create: {
            id: 'lesson-3',
            title: 'Separation of Powers',
            courseId: course1.id,
            order: 3,
            content: 'The principle of separation of powers divides government into three branches: legislative, executive, and judicial.',
            isActive: true,
        },
    });
    console.log('✅ Created lessons');

    // Create test
    const test1 = await prisma.test.upsert({
        where: { id: 'test-1' },
        update: {},
        create: {
            id: 'test-1',
            title: 'Constitutional Law Quiz',
            isPremium: false,
            timeLimit: 5,
        },
    });
    console.log('✅ Created test');

    // Create questions
    await prisma.question.upsert({
        where: { id: 'q-1' },
        update: {},
        create: {
            id: 'q-1',
            testId: test1.id,
            question: 'What is the supreme law of the land?',
            options: ['Constitution', 'Bill of Rights', 'Declaration of Independence', 'Federal Law'],
            correctAnswer: 'Constitution',
        },
    });

    await prisma.question.upsert({
        where: { id: 'q-2' },
        update: {},
        create: {
            id: 'q-2',
            testId: test1.id,
            question: 'How many branches of government are there?',
            options: ['Two', 'Three', 'Four', 'Five'],
            correctAnswer: 'Three',
        },
    });

    await prisma.question.upsert({
        where: { id: 'q-3' },
        update: {},
        create: {
            id: 'q-3',
            testId: test1.id,
            question: 'Which branch makes the laws?',
            options: ['Executive', 'Judicial', 'Legislative', 'Administrative'],
            correctAnswer: 'Legislative',
        },
    });

    await prisma.question.upsert({
        where: { id: 'q-4' },
        update: {},
        create: {
            id: 'q-4',
            testId: test1.id,
            question: 'Who interprets the laws?',
            options: ['President', 'Congress', 'Supreme Court', 'Police'],
            correctAnswer: 'Supreme Court',
        },
    });

    await prisma.question.upsert({
        where: { id: 'q-5' },
        update: {},
        create: {
            id: 'q-5',
            testId: test1.id,
            question: 'What does the First Amendment protect?',
            options: ['Right to bear arms', 'Freedom of speech', 'Right to vote', 'Right to privacy'],
            correctAnswer: 'Freedom of speech',
        },
    });

    console.log('✅ Created questions');
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log('Admin: admin@lawprep.uz');
    console.log('Student: student@test.com');
    console.log('Password: (you need to set via register endpoint)');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
