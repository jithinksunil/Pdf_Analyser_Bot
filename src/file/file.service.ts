import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { GoogleService } from 'src/configurations/google-api/google.service';
@Injectable()
export class FileService {
  constructor(private googleService: GoogleService) {}
  async uploadFile(file: Express.Multer.File, accessToken: string) {
    if (file.mimetype !== 'application/pdf')
      throw new BadRequestException('Only pdf files can be uploaded');

    const { id, originalname: name } =
      await this.googleService.uploadFileToDrive(file, accessToken);
    return { id, name, message: 'Upload completed' };
  }
  async deleteFile(fileId: string, accessToken: string) {
    await this.googleService.deleteFile(fileId, accessToken);
    return { message: 'File deleted' };
  }

  async downloadFile(fileId: string, accessToken: string) {
    const publicUrl = await this.googleService.getFilePublickLink(
      fileId,
      accessToken,
    );
    return { message: 'File downloaded', publicUrl };
  }
}
