import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('/google/signin')
  signinWithGoogle() {
    return this.authService.signinWithGoogle();
  }
  @Get('/google/generate-token')
  genarateGoogleTokens(@Query() query: { code: string }) {
    return this.authService.generateGoogleTokens(query.code);
  }
}
