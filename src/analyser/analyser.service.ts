import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AnalyserService {
  constructor(private commonService: CommonService) {}
  async getAnswer(
    accessToken: string,
    refreshToken: string,
    fileId: string,
    question: string,
  ) {
    const extractedText = await this.commonService.extractFromFile(
      accessToken,
      refreshToken,
      fileId,
    );

    return await this.commonService.analyseWithAi(extractedText, question);
  }
}
