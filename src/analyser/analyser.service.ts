import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AnalyserService {
  constructor(private commonService: CommonService) {}
  async getAnswer(fileId: string, question: string, accessToken: string) {
    const extractedText = await this.commonService.extractFromFile(
      fileId,
      accessToken,
    );
    const answer = await this.commonService.analyseWithAi(
      extractedText,
      question,
    );
    return { answer };
  }
  async getAllPdfFiles(accessToken: string) {
    const files = await this.commonService.getAllPdfFiles(accessToken);
    return { files };
  }
}
