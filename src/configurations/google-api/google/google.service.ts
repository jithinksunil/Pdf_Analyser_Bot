import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
const fs = require('fs');
import base64Url from 'base64url';
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
  async getDriveFiles(accessToken: string, refreshToken: string) {
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

      // const filePath = './downloaded_file/test.pdf'; // Path where you want to save the file
      // const dest = fs.createWriteStream(filePath);
      let pdfBuffer = [];
      response.data
        .on('data', (chunk) => {
          pdfBuffer.push(chunk);
          console.log('Download complete.');
        })
        .on('end', () => {
          const buffer = Buffer.concat(pdfBuffer);
          return buffer;
        });
      // .pipe(dest);
      throw new InternalServerErrorException(
        'Cannot fetch the file from Drive',
      );
    } catch (error) {
      console.error('The API returned an error: ' + error);
    }
  }
}
