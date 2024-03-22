import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleService } from 'src/configurations/google-api/google/google.service';

@Injectable()
export class AuthService {
  constructor(private googleService: GoogleService) {}
  async signinWithGoogle(accessToken: string, refreshToken: string) {
    try {
      const response = await this.googleService.getProfile(
        accessToken,
        refreshToken,
      );
      return { email: response.emailAddress };
    } catch (error) {
      throw new UnauthorizedException('Your are not authorized');
    }
  }
  async getDriveFiles(accessToken: string, refreshToken: string) {
    return this.googleService.getDriveFiles(accessToken, refreshToken);
  }
}
