import { injectable, inject } from 'tsyringe';
import { NotFoundError } from '@lib/errors';
import Freelas from '../infra/typeorm/entities/Freelas';
import IFreelaRepository from '../repositories/IFreelaRepository';
import Categories from '../infra/typeorm/entities/Categories';

@injectable()
class ListFreelaByIdService {
  private freelaRepository: IFreelaRepository;

  constructor(
    @inject('FreelaRepository')
    freelaRepository: IFreelaRepository,
  ) {
    this.freelaRepository = freelaRepository;
  }

  public async execute(id: string): Promise<Freelas> {
    const freela = await this.freelaRepository.findById(id);

    if (!freela) {
      throw new NotFoundError('Freela not found');
    }

    return freela;
  }
}

export default ListFreelaByIdService;
