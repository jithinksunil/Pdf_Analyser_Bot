import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AnalyserService {
  constructor(private commonService: CommonService) {}
  async getAnswer(filePath: string, question: string) {
    const extractedText = await this.commonService.extractFromFile(filePath);
    const answer = await this.commonService.analyseWithOpenAi(
      extractedText,
      question,
    );
    return answer;
  }
}
