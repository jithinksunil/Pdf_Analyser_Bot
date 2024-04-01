import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { GoogleService } from 'src/configurations/google-api/google.service';
import { OpenAiService } from 'src/configurations/openAi/openAi.service';

@Injectable()
export class AnalyserService {
  constructor(
    private commonService: CommonService,
    private OpenAiService: OpenAiService,
    private googleService: GoogleService,
  ) {}
  async getAnswer(fileId: string, question: string, accessToken: string) {
    const extractedText = await this.commonService.extractFromFile(
      fileId,
      accessToken,
    );
    const answer = await this.OpenAiService.analyseWithOpenAi(
      extractedText,
      question,
    );
    return { answer };
  }
  async getAllPdfFiles(accessToken: string) {
    const files = await this.googleService.getAllPdfFiles(accessToken);
    return { files };
  }
}
