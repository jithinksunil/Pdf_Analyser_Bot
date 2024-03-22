export interface GetAnswer {
  accessToken: string;
  fileId: string;
  question: string;
}

export interface SigninWithGoogle {
  accessToken: string;
  refreshToken: string;
}

export interface FileUpload {
  file: Express.Multer.File;
  accessToken: string;
}
