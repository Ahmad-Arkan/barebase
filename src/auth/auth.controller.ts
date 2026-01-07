import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { VerifyDto } from './dto/verify.dto';
import { PasswordDto } from './dto/password.dto';
import { RefreshDto } from './dto/refresh.dto';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { LogoutDto } from './dto/logout.dto';
import fastifyPassport from '@fastify/passport';

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

  // Google OAuth
  @Get('google')
  googleAuth(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const redirectTo = (req.query as any).redirect || '/home';
    console.log('Initiating Google Auth, redirecting to:', redirectTo);

    const state = Buffer.from(JSON.stringify({ redirectTo })).toString(
      'base64',
    );

    return (fastifyPassport.authenticate('google', { state }) as any).call(
      req.server,
      req,
      res,
    );
  }

  @Get('google/callback')
  async googleAuthRedirect(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    try {
      const state = (req.query as any).state;
      let targetPath = '/home'; // default

      if (state) {
        try {
          // Handle potential '+' to ' ' conversion by some parsers
          const base64 = state.replace(/ /g, '+');
          const decodedState = JSON.parse(
            Buffer.from(base64, 'base64').toString(),
          );
          targetPath = decodedState.redirectTo || '/home';
          console.log('Decoded redirect path from state:', targetPath);
        } catch (e) {
          console.error('Failed to decode state', e, 'Raw state:', state);
        }
      }

      await (
        fastifyPassport.authenticate('google', {
          failureRedirect: 'http://localhost:3000/login',
        }) as any
      ).call(req.server, req, res);

      if (!req.user) {
        return res.redirect('http://localhost:3000/login');
      }

      const userData = await this.authService.findOrCreateUserGoogle(
        req.user,
        req,
      );

      // Input Cookies Manually
      const isProd = process.env.NODE_ENV === 'production';
      const cookieHeaders = [
        `refreshToken=${userData.token.refreshToken}; HttpOnly; Path=/; SameSite=Lax${isProd ? '; Secure' : ''}`,
        `accessToken=${userData.token.accessToken}; Path=/; SameSite=Lax${isProd ? '; Secure' : ''}`,
        `userData=${encodeURIComponent(JSON.stringify(userData.data))}; Path=/; SameSite=Lax${isProd ? '; Secure' : ''}`,
      ];

      // 2. Kirim Header secara mentah (Raw)
      res.raw.writeHead(302, {
        Location: `http://localhost:3000${targetPath}`,
        'Set-Cookie': cookieHeaders,
      });

      res.raw.end();
    } catch (error) {
      console.error('OAuth Callback Error:', error);
      return res.status(500).send('Internal Server Error');
    }
  }
}
