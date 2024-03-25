import { Injectable } from '@nestjs/common';
import { GoogleService } from 'src/configurations/google-api/google.service';

@Injectable()
export class AuthService {
  constructor(private googleService: GoogleService) {}
  signinWithGoogle() {
    return this.googleService.createSigninUrl();
  }
  async generateGoogleTokens(code: string) {
    return await this.googleService.createTokens(code);
  }
}
