import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {
  constructor(private commonService: CommonService) {}
  signinWithGoogle() {
    const url = this.commonService.createGoogleSigninUrl();
    return { url };
  }
  async generateGoogleTokens(code: string) {
    const { access_token, refresh_token } =
      await this.commonService.generateGoogleTokens(code);
    return {
      tokens: { accessToken: access_token, refreshToken: refresh_token },
      message: 'Sign in successfull',
    };
  }
  async newAccessToken(refreshToken: string) {
    const { access_token, refresh_token } =
      await this.commonService.shakeHandRefreshToken(refreshToken);
    return { accessToken: access_token, refreshToken: refresh_token };
  }
}
