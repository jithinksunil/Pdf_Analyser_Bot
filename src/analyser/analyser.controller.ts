import {
  Body,
  Controller,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AnalyserService } from './analyser.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { GetAnswerDto } from './dto/getAnswer.dto';

@UseGuards(AuthGuard)
@Controller('analyser')
export class AnalyserController {
  constructor(private analyserService: AnalyserService) {}
  @Post('/:id')
  getAnswer(
    @Body() body: GetAnswerDto,
    @Headers('authorization') accessToken: string,
    @Param('id') fileId: string,
  ) {
    return this.analyserService.getAnswer(fileId, body.question, accessToken);
  }
}
