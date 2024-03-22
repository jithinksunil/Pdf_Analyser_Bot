import { BadRequestException, Injectable } from '@nestjs/common';
import { GoogleService } from 'src/configurations/google-api/google/google.service';
import { Readable } from 'stream';
@Injectable()
export class FileService {
  constructor(private googleSericve: GoogleService) {}
  async uploadFile(accessToken: string, file: Express.Multer.File) {
    return await this.googleSericve.uploadFileToDrive(accessToken, file);
  }
  deleteFile() {
    return 'deleted';
  }
}
