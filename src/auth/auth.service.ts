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
    const tokens = await this.commonService.generateGoogleTokens(code);
    return { tokens, message: 'Sign in successfull' };
  }
}
