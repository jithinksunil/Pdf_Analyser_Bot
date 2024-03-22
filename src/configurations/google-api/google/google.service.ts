import { Injectable } from '@nestjs/common';
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
  async getFile(accessToken: string, refreshToken: string, fileId2: string) {
    const fileId = '1hYQx37XC3-WflM7Iqhz3rD8csnmVukx6';
    this.setCredentials(accessToken, refreshToken);
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

    try {
      const response = await drive.files.get(
        {
          fileId: fileId,
          alt: 'media',
        },
        { responseType: 'stream' },
      );

      let pdfBuffer: any = [];
      return new Promise((resolve, reject) => {
        response.data
          .on('data', (chunk) => {
            pdfBuffer.push(chunk);
          })
          .on('end', () => {
            pdfBuffer = Buffer.concat(pdfBuffer);
            resolve(pdfBuffer);
          })
          .on('error', (err) => {
            reject(err);
          });
      });
    } catch (error) {
      console.error('The API returned an error: ' + error);
    }
  }
}
