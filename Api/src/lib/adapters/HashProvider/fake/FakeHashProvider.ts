import IHashProvider from '../model/IHashProvider';
import ICompareDTO from '../dtos/ICompareDTO';

class FakeHashProvider implements IHashProvider {
  public async create(payload: string): Promise<string> {
    return payload;
  }

  public async compare({ hash, payload }: ICompareDTO): Promise<boolean> {
    return hash === payload;
  }
}

export default FakeHashProvider;
