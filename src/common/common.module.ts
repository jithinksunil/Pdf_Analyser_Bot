import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { OpenAiModule } from 'src/configurations/openAi/openAi.module';

@Module({
  imports: [OpenAiModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
