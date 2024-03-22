import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AnalyserService {
  constructor(private commonService: CommonService) {}
  async getAnswer(filePath: string, question: string) {
    const extractedText = await this.commonService.extractFromFile(filePath);
    return await this.commonService.analyseWithAi(extractedText, question);
  }
}
