import { AlreadyExist, AuthorizationError } from '@lib/errors';
import { injectable, inject } from 'tsyringe';
import Users from '../infra/database/entities/Users';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  title: string;
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

  public async execute({
    id,
    firstName,
    lastName,
    email,
    description,
    title,
  }: IRequest): Promise<Users> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AuthorizationError();
    }

    if (email !== user.email) {
      const checkEmal = await this.userRepository.findByEmail(email);

      if (checkEmal) {
        throw new AlreadyExist('This email is already booked!');
      }
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.description = description;
    user.title = title;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
