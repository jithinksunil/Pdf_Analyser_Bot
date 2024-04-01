import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleService } from 'src/configurations/google-api/google.service';
const pdf = require('pdf-parse');

@Injectable()
export class CommonService {
  googleService: GoogleService;
  constructor(private config: ConfigService) {
    this.googleService = new GoogleService(this.config);
  }

  async extractFromFile(fileId: string, accessToken: string) {
    let dataBuffer = await this.googleService.getFile(fileId, accessToken);
    const data = await pdf(dataBuffer);
    return data.text;
  }
}
