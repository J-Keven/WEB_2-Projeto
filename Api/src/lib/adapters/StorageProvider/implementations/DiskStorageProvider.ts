import fs from 'fs';
import { resolve } from 'path';
import uploadsConfigs from '@configs/uploads';
import IStorageProvider from '../model/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async save(filename: string): Promise<string> {
    const { tempPath, uploadPath } = uploadsConfigs;
    await fs.promises.rename(
      resolve(tempPath, filename),
      resolve(uploadPath, filename),
    );
    try {
      await fs.promises.unlink(resolve(tempPath, filename));
    } catch (error) {
      // error
    }
    return filename;
  }

  public async delete(filename: string): Promise<void> {
    const filePath = resolve(uploadsConfigs.uploadPath, filename);
    try {
      await fs.promises.stat(filePath);

      await fs.promises.unlink(filePath);
    } catch (err: any) {
      throw Error(err);
    }
  }
}

export default DiskStorageProvider;
