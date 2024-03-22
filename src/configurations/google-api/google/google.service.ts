import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class GoogleService {
  constructor(private config: ConfigService) {}
  private oauth2Client = new google.auth.OAuth2({
    clientId: this.config.get('CLIENT_ID'),
    clientSecret: this.config.get('CLIENT_SECRET'),
    redirectUri: this.config.get('REDIRECT_URL'),
  });

  private gmail = google.gmail({
    version: 'v1',
    auth: this.oauth2Client,
  });
  private setCredentials(accessToken: string, refreshToken: string) {
    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }
  async getProfile(accessToken: string, refreshToken: string) {
    this.setCredentials(accessToken, refreshToken);
    const response = await this.gmail.users.getProfile({
      userId: 'me',
    });
    return response.data;
  }
}
