import { injectable, inject } from 'tsyringe';
import IUserRepository from '@resources/users/repositories/IUserRepository';
import {
  AuthorizationError,
  NotFoundError,
  WithoutPermissionError,
  ValidationError,
} from '@lib/errors';
import Freelas from '../infra/database/entities/Freelas';
import IFreelaRepository from '../repositories/IFreelaRepository';

interface IRequestDTO {
  freelaId: string;
  userId: string;
  status?: 'open' | 'in-progress' | 'concluded';
  description?: string;
  title?: string;
  categories?: string[];
}

@injectable()
class UpdateFreelasService {
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

  public async execute({
    freelaId,
    userId,
    status,
    categories,
    description,
    title,
  }: IRequestDTO): Promise<Freelas> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AuthorizationError();
    }

    const freela = await this.freelaRepository.findById(freelaId);

    if (!freela) {
      throw new NotFoundError('freela not found');
    }

    if (freela.userId !== user.id) {
      throw new WithoutPermissionError(
        'This user does not have permission to edit the information of this Freela',
      );
    }

    if (status) {
      if (
        status !== 'open' &&
        status !== 'concluded' &&
        status !== 'in-progress'
      ) {
        throw new ValidationError('Status invalid');
      }

      freela.status = status;
    }

    freela.description =
      description !== undefined ? description : freela.description;
    freela.title = title !== undefined ? title : freela.title;

    // const newCategories =
    // if (
    //   categories !== undefined &&
    //   freela.categories.findIndex(item => !categories.includes(item.name))
    // ) {
    //   //
    // }

    await this.freelaRepository.save(freela);

    return freela;
  }
}

export default UpdateFreelasService;
