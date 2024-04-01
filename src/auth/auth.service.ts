import { Injectable } from '@nestjs/common';
import { GoogleService } from 'src/configurations/google-api/google.service';

@Injectable()
export class AuthService {
  constructor(private googleService: GoogleService) {}
  signinWithGoogle() {
    const url = this.googleService.createSigninUrl();
    return { url };
  }
  async generateGoogleTokens(code: string) {
    const { access_token, refresh_token } =
      await this.googleService.createTokens(code);
    return {
      tokens: { accessToken: access_token, refreshToken: refresh_token },
      message: 'Sign in successfull',
    };
  }
  async newAccessToken(refreshToken: string) {
    const { access_token, refresh_token } =
      await this.googleService.shakeHandRefreshToken(refreshToken);
    return { accessToken: access_token, refreshToken: refresh_token };
  }
}
