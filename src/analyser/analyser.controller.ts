import { Body, Controller, Post } from '@nestjs/common';
import { AnalyserService } from './analyser.service';

@Controller('analyser')
export class AnalyserController {
  constructor(private analyserService: AnalyserService) {}
  @Post('/')
  getAnswer(@Body() body: any) {
    return this.analyserService.getAnswer(
      body.filePath as string,
      body.question as string,
    );
  }
}
