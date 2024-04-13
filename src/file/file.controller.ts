import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guards';

@UseGuards(AuthGuard)
@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Headers('authorization') accessToken: string,
  ) {
    return this.fileService.uploadFile(file, accessToken);
  }
  @Delete('/delete/:id')
  deletePdf(
    @Headers('authorization') accessToken: string,
    @Param('id') fileId: string,
  ) {
    return this.fileService.deleteFile(fileId, accessToken);
  }

  @Get('/download/:id')
  downloadPdf(
    @Param('id') fileId: string,
    @Headers('authorization') accessToken: string,
  ) {
    return this.fileService.downloadFile(fileId, accessToken);
  }
}
