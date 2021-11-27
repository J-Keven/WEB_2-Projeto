import { injectable, inject } from 'tsyringe';
import IUserRepository from '@resources/users/repositories/IUserRepository';
import { AuthorizationError } from '@lib/errors';
import Freelas from '../infra/database/entities/Freelas';
import IFreelaRepository from '../repositories/IFreelaRepository';

@injectable()
class LIstAllFreelasByStatusService {
  private freelaRepository: IFreelaRepository;

  private userRepository: IUserRepository;

  constructor(
    @inject('FreelaRepository')
    freelaRepository: IFreelaRepository,
    @inject('UserRepository')
    userRepository: IUserRepository,
  ) {
    this.freelaRepository = freelaRepository;
    this.userRepository = userRepository;
  }

  public async execute(user_id: string, page?: number): Promise<Freelas[]> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AuthorizationError();
    }

    const freelas = await this.freelaRepository.findAllOfUser(
      user_id,
      page || 1,
    );

    // const response = Promise.all(
    //   freelas.map(async freela => {
    //     const catergoriesId = await this.categorieIdFreelaIdRepository.findByFreelaId(
    //       freela.id,
    //     );

    //     return {
    //       ...freela,
    //       categories: catergoriesId.map(item => item.categorie),
    //     };
    //   }),
    // );
    return freelas;
  }
}

export default LIstAllFreelasByStatusService;
