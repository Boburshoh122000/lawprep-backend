import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TestsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.TestCreateInput) {
        return this.prisma.test.create({
            data,
            include: {
                questions: true,
            },
        });
    }

    async findAll() {
        return this.prisma.test.findMany({
            include: {
                _count: {
                    select: { questions: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.test.findUnique({
            where: { id },
            include: {
                questions: true,
            },
        });
    }

    async update(id: string, data: Prisma.TestUpdateInput) {
        return this.prisma.test.update({
            where: { id },
            data,
            include: {
                questions: true,
            },
        });
    }

    async remove(id: string) {
        return this.prisma.test.delete({
            where: { id },
        });
    }

    // Question Management
    async addQuestion(testId: string, data: Omit<Prisma.QuestionCreateInput, 'test'>) {
        return this.prisma.question.create({
            data: {
                ...data,
                test: {
                    connect: { id: testId },
                },
            },
        });
    }

    async updateQuestion(id: string, data: Prisma.QuestionUpdateInput) {
        return this.prisma.question.update({
            where: { id },
            data,
        });
    }

    async removeQuestion(id: string) {
        return this.prisma.question.delete({
            where: { id },
        });
    }
}
