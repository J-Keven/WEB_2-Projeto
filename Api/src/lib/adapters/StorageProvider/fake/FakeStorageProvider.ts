import IStorageProvider from '../model/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private files: string[] = [];

  public async save(filename: string): Promise<string> {
    this.files.push(filename);

    return filename;
  }

  public async delete(filename: string): Promise<void> {
    const indexOf = this.files.findIndex(item => item === filename);

    if (indexOf !== -1) {
      this.files.slice(indexOf, 1);
    }
  }
}

export default FakeStorageProvider;
