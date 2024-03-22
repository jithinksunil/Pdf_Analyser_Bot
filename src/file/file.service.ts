import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  constructor() {}
  async uploadFile(file: Express.Multer.File) {}
  deleteFile() {
    return 'deleted';
  }
}
