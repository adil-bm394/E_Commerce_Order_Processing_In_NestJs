import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private AuthService: AuthService
    ){}

    @Post('/signup')
    async signUp(@Body() signUpDto:SignUpDto){
        return this.AuthService.signUp(signUpDto);
    }

    @Post('/login')
    async login(@Body () loginDto:LoginDto){
        return this.AuthService.login(loginDto);
    }
}
