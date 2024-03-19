import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfAnalyserModule } from './pdf-analyser/pdf-analyser.module';

@Module({
  imports: [PdfAnalyserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
