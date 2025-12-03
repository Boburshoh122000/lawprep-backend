import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                isPremium: true,
                coins: true,
                createdAt: true,
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                testResults: true,
                achievements: true,
            },
        });
    }

    async update(id: string, data: any) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async banUser(id: string) {
        // Implement ban logic - for now just update a status
        return this.prisma.user.update({
            where: { id },
            data: { role: 'STUDENT' }, // Placeholder
        });
    }

    async addCoins(id: string, amount: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new Error('User not found');
        return this.prisma.user.update({
            where: { id },
            data: { coins: user.coins + amount },
        });
    }
}
