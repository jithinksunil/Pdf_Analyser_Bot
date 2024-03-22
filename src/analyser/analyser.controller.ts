import { Body, Controller, Header, Post } from '@nestjs/common';
import { AnalyserService } from './analyser.service';

@Controller('analyser')
export class AnalyserController {
  constructor(private analyserService: AnalyserService) {}
  @Post('/')
  getAnswer(@Body() body: any) {
    return this.analyserService.getAnswer(
      body.accessToken as string,
      body.refreshToken as string,
      body.fileId as string,
      body.question as string,
    );
  }
}
