import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const filePath = resolve(__dirname, '..', '..', 'tmp');

interface IUploads {
  tmpPath: string;
  uploadPath: string;
  driver: 'disk' | 's3';
  multer: multer.StorageEngine;
  configs: {
    disk: {
      //
    };
    s3: {
      bucket: string;
    };
  };
}

export default {
  tmpPath: filePath,
  uploadPath: resolve(filePath, 'uploads'),
  driver: process.env.STORAGE_DRIVER || 'disk',
  multer: multer.diskStorage({
    destination: filePath,
    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(8).toString('hex');

      const filename = `${hash}-${file.originalname}`;
      return cb(null, filename);
    },
  }),
  configs: {
    disk: {},
    s3: {
      bucket: process.env.aws_bucket || '',
    },
  },
} as IUploads;
