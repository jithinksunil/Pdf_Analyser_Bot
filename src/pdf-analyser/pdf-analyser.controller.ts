import { Controller, Get, Post } from '@nestjs/common';
import { PdfAnalyserService } from './pdf-analyser.service';

@Controller('pdf-analyser')
export class PdfAnalyserController {
  constructor(private pdfAnalyserService: PdfAnalyserService) {}
  @Get()
  analysePdf() {
    return this.pdfAnalyserService.analysePdf();
  }
}
