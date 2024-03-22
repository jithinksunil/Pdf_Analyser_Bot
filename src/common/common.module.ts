import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { OpenAiModule } from 'src/configurations/openAi/openAi.module';
import { GoogleModule } from 'src/configurations/google-api/google/google.module';

@Module({
  imports: [OpenAiModule, GoogleModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
