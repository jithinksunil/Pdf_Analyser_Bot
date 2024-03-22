import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUpload } from 'src/interfaces';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: FileUpload,
  ) {
    return await this.fileService.uploadFile(body.accessToken, file);
  }
  @Delete('delete')
  deletePdf() {
    return this.fileService.deleteFile();
  }
}
