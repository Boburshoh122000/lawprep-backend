import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        // For now, hardcoded admin check - replace with real password hashing later
        if (email === 'admin@lawprep.uz' && password === 'admin123') {
            return { id: '1', email, role: 'SUPER_ADMIN' };
        }

        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user) {
            return user;
        }
        return null;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name || 'Admin',
                role: user.role,
            },
        };
    }

    async register(email: string, password: string, name: string) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                name,
                role: 'STUDENT',
            },
        });

        return user;
    }
}
