import AutheticadedUserService from '@modules/users/services/AutheticadedUserService';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ITokenProvider from '@modules/users/infra/providers/TokenProvider/model/ITokenProvider';
import FakeTokenProvider from '@modules/users/infra/providers/TokenProvider/fake/FakeTokenProvider';
import IHashProvider from '@modules/users/infra/providers/HashProvider/model/IHashProvider';
import FakehashProvider from '@modules/users/infra/providers/HashProvider/fake/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import Apperror from '@shared/errors/AppError';

let autheticadedUserService: AutheticadedUserService;
let fakeUsersRepository: IUsersRepository;
let fakeTokenProvider: ITokenProvider;
let fakeHashProvider: IHashProvider;

describe('AutheticadedUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeTokenProvider = new FakeTokenProvider();
    fakeHashProvider = new FakehashProvider();
    autheticadedUserService = new AutheticadedUserService(
      fakeUsersRepository,
      fakeTokenProvider,
      fakeHashProvider,
    );
  });

  it('should be able to create a new session for user', async () => {
    const user = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      firstName: 'Jonh',
      lastName: 'Doe',
      password: '123456',
    });

    const session = await autheticadedUserService.execute({
      email: user.email,
      password: '123456',
    });

    expect(session.token).not.toBeNull();
    expect(session.user.id).toBe(user.id);
  });

  it('should be able to create a new session for user if email is incorrect', async () => {
    const user = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      firstName: 'Jonh',
      lastName: 'Doe',
      password: '123456',
    });

    await expect(
      autheticadedUserService.execute({
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Apperror);
  });

  it('should be able to create a new session for user if password is incorrect', async () => {
    const user = await fakeUsersRepository.create({
      email: 'jonhdoe@example.com',
      firstName: 'Jonh',
      lastName: 'Doe',
      password: '123456',
    });

    await expect(
      autheticadedUserService.execute({
        email: user.email,
        password: '12345677',
      }),
    ).rejects.toBeInstanceOf(Apperror);
  });
});
