import { Body, Controller, Post } from '@nestjs/common';
import { GoogleService } from 'src/configurations/google-api/google/google.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/google/signin')
  signinWithGoogle(@Body() body: any) {
    return this.authService.signinWithGoogle(
      body.accessToken as string,
      body.refreshToken as string,
    );
  }
}
