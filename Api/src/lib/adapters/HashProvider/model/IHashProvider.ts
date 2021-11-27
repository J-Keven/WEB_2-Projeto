import ICompareDTO from '../dtos/ICompareDTO';

export default interface IHashProvider {
  create(payload: string): Promise<string>;
  compare(data: ICompareDTO): Promise<boolean>;
}
