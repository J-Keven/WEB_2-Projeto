import { injectable, inject } from 'tsyringe';
import Freelas from '../infra/database/entities/Freelas';
import IFreelaRepository from '../repositories/IFreelaRepository';
import Categories from '../infra/database/entities/Categories';

@injectable()
class LIstAllFreelasService {
  private freelaRepository: IFreelaRepository;

  constructor(
    @inject('FreelaRepository')
    freelaRepository: IFreelaRepository,
  ) {
    this.freelaRepository = freelaRepository;
  }

  public async execute(status?: string, page?: number): Promise<Freelas[]> {
    let freelas: Freelas[] = [];
    if (status) {
      freelas = await this.freelaRepository.findByStatus(status, page || 1);
    } else {
      // freelas = await this.freelaRepository.findAll('', page || 1);
    }

    return freelas;
  }
}

export default LIstAllFreelasService;
