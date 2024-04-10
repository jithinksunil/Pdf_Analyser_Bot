import { BadRequestException, Injectable } from '@nestjs/common';
import { GoogleService } from 'src/configurations/google-api/google.service';
@Injectable()
export class FileService {
  constructor(private googleService: GoogleService) {}
  async uploadFile(file: Express.Multer.File, accessToken: string) {
    if (file.mimetype !== 'application/pdf')
      throw new BadRequestException('Only pdf files can be uploaded');

    const { id: fileId, originalname: name } =
      await this.googleService.uploadFileToDrive(file, accessToken);
    return { fileId, name, message: 'Upload completed' };
  }
  deleteFile(fileId: string, accessToken: string) {
    this.googleService.deleteFile(fileId, accessToken);
    return { message: 'File deleted' };
  }
}
