import {diskStorage} from 'multer';
import {Request} from 'express';
import {HttpException, HttpStatus} from '@nestjs/common';
import {join} from 'path';

const filter = function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb,
) {
  const pattern = new RegExp('.png|jpg|jpeg|jfif|gif');
  if (file.originalname.match(pattern)) {
    cb(null, true);
  } else {
    cb(
      new HttpException('File Format is invalid', HttpStatus.BAD_REQUEST),
      false,
    );
  }
};

export const multerOptions = {
  storage: diskStorage({
    filename: function (req: Request, file: Express.Multer.File, cb) {
      cb(null, file.originalname);
    },
    destination: function (req: Request, file: Express.Multer.File, cb) {
      cb(null, join(__dirname, '..', '..', 'public'));
    },
  }),
  fileFilter: filter,
};
