import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gurds/local-auth.guard';
import { JwtAuthGuard } from './gurds/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('login')
   @UseGuards(LocalAuthGuard)
   async login(@Request() req: Request & { user: CreateUserDto }) {
      return this.authService.login(req.user);
   }

   @Get('profile')
   @UseGuards(JwtAuthGuard)
   getProfile(@Request() req: Request & { user: CreateUserDto }) {
      return req.user;
   }
}
