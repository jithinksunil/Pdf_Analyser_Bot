import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
@Injectable()
export class FileService {
  constructor(private commonService: CommonService) {}
  async uploadFile(file: Express.Multer.File, accessToken: string) {
    return await this.commonService.uploadFileToCloundServer(file, accessToken);
  }
  deleteFile(fileId: string, accessToken: string) {
    return this.commonService.deleteFileFromCloundServer(fileId, accessToken);
  }
}
