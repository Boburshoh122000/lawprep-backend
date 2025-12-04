import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
        console.log('Login request body:', loginDto);
        if (!loginDto || !loginDto.email || !loginDto.password) {
            throw new BadRequestException('Email and password are required');
        }
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @Post('register')
    async register(
        @Body() registerDto: { email: string; password: string; name: string },
    ) {
        return this.authService.register(
            registerDto.email,
            registerDto.password,
            registerDto.name,
        );
    }
}
