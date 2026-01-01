import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { VerifyDto } from './dto/verify.dto';
import { PasswordDto } from './dto/password.dto';
import { RefreshDto } from './dto/refresh.dto';
import type { FastifyRequest } from 'fastify';
import { LogoutDto } from './dto/logout.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  refresh(@Body() refreshDto: RefreshDto, @Req() req: FastifyRequest) {
    return this.authService.refresh(refreshDto, req);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() req: FastifyRequest) {
    return this.authService.login(loginDto, req);
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signup/verify')
  signupVerify(@Body() verifyDto: VerifyDto) {
    return this.authService.signupVerify(verifyDto);
  }

  @Post('signup/password')
  signupPassword(@Body() passwordDto: PasswordDto, @Req() req: FastifyRequest) {
    return this.authService.signupPassword(passwordDto, req);
  }

  @Post('logout')
  logout(@Body() logoutdto: LogoutDto) {
    return this.authService.logout(logoutdto);
  }
}
