import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/configurations/cloudinary/cloudinary.service';

@Injectable()
export class FileService {
  constructor(private cloudinary: CloudinaryService) {}
  async uploadFile(file: Express.Multer.File) {
    try {
      const res = await this.cloudinary.uploadImage(file);
      console.log(res);
    } catch (error) {
      throw new BadRequestException('Invalid file type.');
    }
  }
  deleteFile() {
    return 'deleted';
  }
}
