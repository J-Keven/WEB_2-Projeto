import { Repository, getRepository } from 'typeorm';
import ICreateFreelasDTO from '@resources/freelas/dtos/ICreateFreelasDTO';
import IFreelasRepository from '@resources/freelas/repositories/IFreelaRepository';
import Freelas from '../entities/Freelas';

class FreelasRepository implements IFreelasRepository {
  private ormRepository: Repository<Freelas>;

  constructor() {
    this.ormRepository = getRepository(Freelas);
    console.log(new Freelas());
  }

  public async findAll(status: string, page: number): Promise<Freelas[]> {
    return this.ormRepository.find({
      where: {
        status,
      },
    });
  }

  public async findAllOfUser(userId: string): Promise<Freelas[]> {
    const freelas = await this.ormRepository.find({
      where: {
        userId,
      },
    });

    return freelas;
  }

  public async findByStatus(status: string): Promise<Freelas[]> {
    const freelas = await this.ormRepository.find({
      where: {
        status,
      },
      order: {
        created_at: 'ASC',
      },
    });

    return freelas;
  }

  public async findById(id: string): Promise<Freelas | undefined> {
    const freela = await this.ormRepository.findOne(id);
    return freela;
  }

  public async create({
    userId,
    title,
    description,
    price,
    categories,
    filename,
  }: ICreateFreelasDTO): Promise<Freelas> {
    const freela = this.ormRepository.create({
      userId,
      title,
      description,
      price,
      status: 'open',
      categories,
      imageUrl: filename,
    });

    await this.ormRepository.save(freela);

    return freela;
  }

  public async save(freelaData: Freelas): Promise<Freelas> {
    await this.ormRepository.save(freelaData);
    return freelaData;
  }
}
export default FreelasRepository;
