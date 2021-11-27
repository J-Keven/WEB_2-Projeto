import { UploadError } from '@lib/errors';
import { Logger } from '@lib/logger';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import { resolve } from 'path';
import upload from '../../../../configs/uploads';

import IStorageProvider from '../model/IStorageProvider';

class S3Adapter implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
      // apiVersion: '',
    });
  }

  public async save(filename: string): Promise<string> {
    try {
      console.log(filename);
      const originalPath = resolve(upload.tmpPath, filename);

      const fileContent = await fs.promises.readFile(originalPath);

      const extension = filename.split('.');

      const Bucket = upload.configs.s3.bucket;
      const filenameParse = filename;

      await this.client
        .putObject({
          Bucket: 'hub-api',
          Key: filenameParse,
          ACL: 'public-read',
          Body: fileContent,
          ContentType: extension[extension.length - 1],
        })
        .promise();

      await fs.promises.unlink(resolve(upload.tmpPath, filename));
      return filenameParse;
    } catch (error) {
      Logger.error(`error during file upload process. Error: ${String(error)}`);
      throw new UploadError('An error occurred while trying to save the file.');
    }
  }

  public async delete(fileName: string): Promise<void> {
    // await this.client
    //   .deleteObject({
    //     Bucket: upload.configs.s3.bucket,
    //     Key: fileName,
    //   })
    //   .promise();
  }
}

export default S3Adapter;
