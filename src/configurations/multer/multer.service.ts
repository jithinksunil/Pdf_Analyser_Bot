import { Injectable } from '@nestjs/common';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

@Injectable()
export class MulterService {
  constructor() {}
  private fileStorage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'categories',
    } as { folder: string },
  });
  uploadFile = multer({
    storage: this.fileStorage,
    fileFilter: (req, file, callback) => {
      // pdf validation for files other than required format,can avoid this  field if validain is not required
      if (file.mimetype == 'pdf/pdf') {
        callback(null, true);
      } else {
        callback(null, false);
        return callback(new Error('only pdf file are allowed'));
      }
    },
  });
}
