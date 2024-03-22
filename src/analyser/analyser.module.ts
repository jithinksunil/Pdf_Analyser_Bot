import { Module } from '@nestjs/common';
import { AnalyserService } from './analyser.service';
import { AnalyserController } from './analyser.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [AnalyserService],
  controllers: [AnalyserController],
})
export class AnalyserModule {}
