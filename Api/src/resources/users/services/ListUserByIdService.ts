import { AuthorizationError } from '@lib/errors';
import { injectable, inject } from 'tsyringe';
import Users from '../infra/database/entities/Users';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  id: string;
}

@injectable()
class UpdateProfileService {
  private userRepository: IUserRepository;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({ id }: IRequest): Promise<Users> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AuthorizationError();
    }

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
