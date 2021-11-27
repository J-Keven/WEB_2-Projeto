import bcrypt from 'bcryptjs';
import IHashPassordProvider from '../model/IHashProvider';
import ICompareDTO from '../dtos/ICompareDTO';

class BcryptProvider implements IHashPassordProvider {
  public async create(payload: string): Promise<string> {
    const hash = await bcrypt.hash(payload, 8);

    return hash;
  }

  public async compare({ payload, hash }: ICompareDTO): Promise<boolean> {
    const isEqual = await bcrypt.compare(payload, hash);

    return isEqual;
  }
}

export default BcryptProvider;
