import { Controller, Delete, Post } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}
  @Post('/upload')
  uploadPdf() {
    return this.fileService.uploadPdf();
  }
  @Delete('/delete')
  deletePdf() {
    return this.fileService.deletePdf();
  }
}
