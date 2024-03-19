import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  uploadPdf() {
    return 'Upload complete';
  }
  deletePdf() {
    return 'deleted';
  }
}
