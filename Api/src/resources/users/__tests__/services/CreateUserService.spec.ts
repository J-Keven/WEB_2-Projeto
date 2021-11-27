import IUserRepository from '@modules/users/repositories/IUserRepository';
import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import ITokenProvider from '@modules/users/infra/providers/TokenProvider/model/ITokenProvider';
import IHashProvider from '@modules/users/infra/providers/HashProvider/model/IHashProvider';
import FakeHashProvider from '@modules/users/infra/providers/HashProvider/fake/FakeHashProvider';
import FakeTokenProvider from '@modules/users/infra/providers/TokenProvider/fake/FakeTokenProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: IUserRepository;
let fakeTokenProvider: ITokenProvider;
let fakeHashProvider: IHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeTokenProvider = new FakeTokenProvider();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeTokenProvider,
      fakeHashProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const { token, user } = await createUserService.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).not.toBeNull();
    expect(token).toBe('johndoe@example.com');
  });

  it('should not be able to create a new user with email is already exist', async () => {
    await fakeUserRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        firstName: 'John',
        lastName: 'Tre',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
