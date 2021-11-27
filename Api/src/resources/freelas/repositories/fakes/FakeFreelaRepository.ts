import ICreateFreelasDTO from '@resources/freelas/dtos/ICreateFreelasDTO';
import Freelas from '@resources/freelas/infra/typeorm/entities/Freelas';
import { v4 as uuidV4 } from 'uuid';
import IFreelasRepository from '../IFreelaRepository';

class FakeFreelasRepository implements IFreelasRepository {
  findByStatus(status: string): Promise<Freelas[]> {
    throw new Error('Method not implemented.');
  }

  private freelas: Freelas[] = [];

  public async findById(id: string): Promise<Freelas | undefined> {
    const freela = this.freelas.find(item => item.id === id);
    return freela;
  }

  public async findAllOfUser(user_id: string): Promise<Freelas[]> {
    const freelas = this.freelas.filter(item => item.user_id === user_id);

    return freelas;
  }

  public async create({
    user_id,
    title,
    description,
    price,
  }: ICreateFreelasDTO): Promise<Freelas> {
    const freela = new Freelas();

    Object.assign(freela, {
      id: uuidV4(),
      user_id,
      title,
      description,
      price,
    });

    this.freelas.push(freela);

    return freela;
  }

  public async save(freelaData: Freelas): Promise<Freelas> {
    const index = this.freelas.findIndex(freela => freela.id === freelaData.id);

    if (index === -1) {
      this.freelas.push(freelaData);
    } else {
      this.freelas[index] = freelaData;
    }
    return freelaData;
  }
}
export default FakeFreelasRepository;
