import { BadRequestException, Injectable } from '@nestjs/common';
import { GoogleService } from 'src/configurations/google-api/google.service';
import * as pdftopic from 'pdftopic';
import * as fs from 'fs';

@Injectable()
export class FileService {
  constructor(private googleService: GoogleService) {}
  async uploadFile(file: Express.Multer.File, accessToken: string) {
    if (file.mimetype !== 'application/pdf')
      throw new BadRequestException('Only pdf files can be uploaded');

    const { id, originalname: name } =
      await this.googleService.uploadFileToDrive(file, accessToken);
    const imageBuffers = await pdftopic
      .pdftobuffer(file.buffer, 'all')
      .then((buffers) => buffers.map((buffer) => buffer.toString('base64')));
    imageBuffers.map((buffer, index) =>
      fs.writeFile(`${index}.jpg`, buffer, (err) => {
        if (err) throw err;
        console.log('The image has been saved!');
      }),
    );
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
