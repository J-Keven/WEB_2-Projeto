import FakeFreelaRepository from '@modules/freelas/repositories/fakes/FakeFreelaRepository';
import IFreelaRepository from '@modules/freelas/repositories/IFreelaRepository';
import CreateFreelaService from '@modules/freelas/services/CreateFreelaService';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import AppError from '@shared/errors/AppError';

let fakeFreelaRepository: IFreelaRepository;
let fakeUserRepository: IUserRepository;
let createFreelaService: CreateFreelaService;
describe('CreateFreela', () => {
  beforeEach(() => {
    fakeFreelaRepository = new FakeFreelaRepository();
    fakeUserRepository = new FakeUserRepository();
    createFreelaService = new CreateFreelaService(
      fakeFreelaRepository,
      fakeUserRepository,
    );
  });
  it('should be able to create a new freela', async () => {
    const createFreela = jest.spyOn(fakeFreelaRepository, 'create');
    const user = await fakeUserRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const freela = await createFreelaService.execute({
      user_id: user.id,
      title: 'a new application',
      description: 'developme a new application',
      price: 100,
    });

    expect(createFreela).toBeCalledWith({
      user_id: user.id,
      title: 'a new application',
      description: 'developme a new application',
      price: 100,
    });
    expect(freela.id).not.toBeNull();
    expect(freela.title).toBe('a new application');
  });

  it('should not be able to create a new freela if user id to invalid', async () => {
    await expect(
      createFreelaService.execute({
        user_id: 'user-id',
        title: 'a new application',
        description: 'developme a new application',
        price: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
