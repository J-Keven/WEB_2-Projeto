import { injectable, inject } from 'tsyringe';
import { AlreadyExist } from '@lib/errors';
import ITokenProvider from '@lib/adapters/TokenProvider/model/ITokenProvider';
import IHashProvider from '@lib/adapters/HashProvider/model/IHashProvider';
import Users from '../infra/database/entities/Users';

import IUserRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  title: string;
}

interface IResponseDTO {
  user: Users;
  token: string;
}

@injectable()
class CreateUserServece {
  private userRepository: IUserRepository;

  private tokenProvider: ITokenProvider;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,

    @inject('TokenProvider')
    tokenProvider: ITokenProvider,

    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.userRepository = userRepository;
    this.tokenProvider = tokenProvider;
    this.hashProvider = hashProvider;
  }

  public async execute({
    email,
    firstName,
    lastName,
    password,
    title,
  }: IRequestDTO): Promise<IResponseDTO> {
    const usersExists = await this.userRepository.findByEmail(email);

    if (usersExists) {
      throw new AlreadyExist('Email address already used');
    }

    const hashPassword = await this.hashProvider.create(password);

    const user = await this.userRepository.create({
      email,
      firstName,
      lastName,
      password: hashPassword,
      title,
    });

    await this.userRepository.save(user);

    const token = await this.tokenProvider.generete(user);

    return {
      user,
      token,
    };
  }
}

export default CreateUserServece;
