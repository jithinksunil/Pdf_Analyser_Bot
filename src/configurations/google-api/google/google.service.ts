import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { Readable } from 'stream';

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
  private setCredentials(accessToken: string, refreshToken?: string) {
    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }
  async getProfile(accessToken: string) {
    this.setCredentials(accessToken);
    const response = await this.gmail.users.getProfile({
      userId: 'me',
    });
    return response.data;
  }
  async getFile(accessToken: string, fileId: string) {
    this.setCredentials(accessToken);
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

    try {
      const response = await drive.files.get(
        {
          fileId: fileId,
          alt: 'media',
        },
        { responseType: 'stream' },
      );

      let pdfBuffer = [];
      return new Promise((resolve, reject) => {
        response.data
          .on('data', (chunk) => {
            pdfBuffer.push(chunk);
          })
          .on('end', () => {
            const buffer = Buffer.concat(pdfBuffer);
            resolve(buffer);
          })
          .on('error', (err) => {
            reject(err);
          });
      });
    } catch (error) {
      console.error('The API returned an error: ' + error);
    }
  }
  async uploadFileToDrive(accessToken: string, file: Express.Multer.File) {
    this.setCredentials(accessToken);
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    const { originalname, mimetype, buffer } = file;

    const fileMetadata = {
      name: originalname,
    };

    const media = {
      mimeType: mimetype,
      body: new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      }),
    };

    try {
      const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
      });

      return response.data.id;
    } catch (error) {
      console.error('Failed to upload file to Google Drive:', error);
      throw error;
    }
  }
}
