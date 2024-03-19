import { Module } from '@nestjs/common';
import { PdfAnalyserService } from './pdf-analyser.service';
import { PdfAnalyserController } from './pdf-analyser.controller';

@Module({
  providers: [PdfAnalyserService],
  controllers: [PdfAnalyserController]
})
export class PdfAnalyserModule {}
