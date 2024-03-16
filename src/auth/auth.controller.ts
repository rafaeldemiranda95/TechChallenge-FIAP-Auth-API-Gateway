import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    //rota de teste so para ver se a aplicação funciona

    @Get('test')
    @HttpCode(HttpStatus.OK)
    async test() {
        return {
            message: 'Test successful',
        };
    }


    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerDto: any) {
        try {
            const registeredUser = await this.authService.register(registerDto);
            return {
                message: 'User registered successfully',
                user: registeredUser,
            };
        } catch (error) {
            return {
                message: 'Registration failed',
                error: error.message,
            };
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: any) {
        try {
            const token = await this.authService.login(loginDto);
            return {
                message: 'Login successful',
                token: token,
            };
        } catch (error) {
            return {
                message: 'Login failed',
                error: error.message,
            };
        }
    }
}
