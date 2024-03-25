import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/configurations/openAi/openAi.service';
import { ConfigService } from '@nestjs/config';
import { GoogleService } from 'src/configurations/google-api/google.service';
const pdf = require('pdf-parse');

@Injectable()
export class CommonService {
  googleService: GoogleService;
  constructor(
    private openAiService: OpenAiService,
    private config: ConfigService,
  ) {
    this.googleService = new GoogleService(this.config);
  }

  async extractFromFile(fileId: string, accessToken: string) {
    let dataBuffer = await this.googleService.getFile(fileId, accessToken);
    const data = await pdf(dataBuffer);
    return data.text;
  }

  async analyseWithAi(context: string, question: string) {
    return await this.openAiService.analyseWithOpenAi(context, question);
  }
  async uploadFileToCloundServer(
    file: Express.Multer.File,
    accessToken: string,
  ) {
    return await this.googleService.uploadFileToDrive(file, accessToken);
  }
  async deleteFileFromCloundServer(fileId: string, accessToken: string) {
    await this.googleService.deleteFile(fileId, accessToken);
  }
  createGoogleSigninUrl() {
    return this.googleService.createSigninUrl();
  }
  async generateGoogleTokens(code: string) {
    return this.googleService.createTokens(code);
  }
}
