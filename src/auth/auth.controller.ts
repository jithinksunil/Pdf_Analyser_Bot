import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('/google/signin')
  signinWithGoogle() {
    return this.authService.signinWithGoogle();
  }
  @Get('/google/generate-token')
  async genarateGoogleTokens(@Query() query: { code: string }) {
    return await this.authService.generateGoogleTokens(query.code);
  }
  @Patch('/google/refresh')
  async newAccessToken(@Body() body: { refreshToken: string }) {
    return await this.authService.newAccessToken(body.refreshToken);
  }
}
