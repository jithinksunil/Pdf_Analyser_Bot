import { Body, Controller, Header, Post } from '@nestjs/common';
import { AnalyserService } from './analyser.service';
import { GetAnswer } from 'src/interfaces';

@Controller('analyser')
export class AnalyserController {
  constructor(private analyserService: AnalyserService) {}
  @Post('/')
  getAnswer(@Body() body: GetAnswer) {
    return this.analyserService.getAnswer(
      body.accessToken as string,
      body.fileId as string,
      body.question as string,
    );
  }
}
