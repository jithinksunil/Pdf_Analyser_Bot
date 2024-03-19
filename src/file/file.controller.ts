import {
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterService } from '../configurations/multer/multer.service';

@Controller('file')
export class FileController {
  constructor(
    private fileService: FileService,
    private multer: MulterService,
  ) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', this.multer))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadFile(file);
  }
  @Delete('delete')
  deletePdf() {
    return this.fileService.deleteFile();
  }
}
