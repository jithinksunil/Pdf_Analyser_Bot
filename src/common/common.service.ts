import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/configurations/openAi/openAi.service';
const pdf = require('pdf-parse');
import { GoogleService } from 'src/configurations/google-api/google/google.service';

@Injectable()
export class CommonService {
  constructor(
    private openAiService: OpenAiService,
    private googleService: GoogleService,
  ) {}
  async analyseWithAi(context: string, question: string) {
    return await this.openAiService.analyseWithOpenAi(context, question);
  }

  async extractFromFile(
    accessToken: string,
    refreshToken: string,
    fileId: string,
  ) {
    let dataBuffer = await this.googleService.getFile(
      accessToken,
      refreshToken,
      fileId,
    );
    const data = await pdf(dataBuffer);
    return data.text;
  }
}
