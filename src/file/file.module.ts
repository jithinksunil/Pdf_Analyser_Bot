import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { GoogleModule } from 'src/configurations/google-api/google/google.module';

@Module({
  imports: [GoogleModule],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
