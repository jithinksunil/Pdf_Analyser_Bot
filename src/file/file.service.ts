import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
@Injectable()
export class FileService {
  constructor(private commonService: CommonService) {}
  async uploadFile(file: Express.Multer.File, accessToken: string) {
    const fileId = await this.commonService.uploadFileToCloundServer(
      file,
      accessToken,
    );
    return { fileId, message: 'Upload completed' };
  }
  deleteFile(fileId: string, accessToken: string) {
    this.commonService.deleteFileFromCloundServer(fileId, accessToken);
    return { message: 'File downloaded successFully' };
  }
}
