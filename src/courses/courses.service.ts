import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.course.findMany({
            include: {
                lessons: {
                    orderBy: { order: 'asc' },
                },
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.course.findUnique({
            where: { id },
            include: {
                lessons: {
                    orderBy: { order: 'asc' },
                    include: {
                        flashcards: true,
                    },
                },
            },
        });
    }

    async create(data: any) {
        return this.prisma.course.create({
            data,
        });
    }

    async update(id: string, data: any) {
        return this.prisma.course.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        return this.prisma.course.delete({
            where: { id },
        });
    }

    // Lesson operations
    async createLesson(courseId: string, data: any) {
        return this.prisma.lesson.create({
            data: {
                ...data,
                courseId,
            },
        });
    }

    async updateLesson(id: string, data: any) {
        return this.prisma.lesson.update({
            where: { id },
            data,
        });
    }
}
