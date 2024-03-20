import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { CloudinaryModule } from 'src/configurations/cloudinary/cloudinay.module';

@Module({
  imports: [CloudinaryModule],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
