import { injectable, inject } from 'tsyringe';
import IStorageProvader from '@lib/adapters/StorageProvider/model/IStorageProvider';
import { AuthorizationError } from '@lib/errors';
import Users from '../infra/database/entities/Users';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  id: string;
  filename: string;
}
@injectable()
class UpdateAvatarService {
  private userRepository: IUserRepository;

  private storageProvider: IStorageProvader;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('StorageProvider')
    storageProvider: IStorageProvader,
  ) {
    this.userRepository = userRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({ id, filename }: IRequest): Promise<Users> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AuthorizationError();
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar);
    }

    await this.storageProvider.save(filename);

    user.avatar = filename;

    await this.userRepository.save(user);
    return user;
  }
}

export default UpdateAvatarService;
