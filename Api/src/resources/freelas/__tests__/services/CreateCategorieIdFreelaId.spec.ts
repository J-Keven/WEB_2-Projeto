import CreateCategorieIdFreelaIdService from '@modules/freelas/services/CreateCategorieIdFreelaIdService';
import ICategoriesRepository from '@modules/freelas/repositories/ICategoriesRepository';
import ICategorieIdFreelaIdRepository from '@modules/freelas/repositories/ICategorieIdFreelaIdRepository';
import IFreelaRepository from '@modules/freelas/repositories/IFreelaRepository';
import FakeCategoriesRepository from '@modules/freelas/repositories/fakes/FakeCategoriesRepository';
import FakeCategorieIdFreelaIdRepository from '@modules/freelas/repositories/fakes/FakeCategorieIdFreelaIdRepository';
import FakeFreelaRepository from '@modules/freelas/repositories/fakes/FakeFreelaRepository';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';

let fakeCategoriesRepository: ICategoriesRepository;
let fakeCategorieIdFreelaIdRepository: ICategorieIdFreelaIdRepository;
let fakeFreelaRepository: IFreelaRepository;
let fakeUserRepository: FakeUserRepository;
let createCategorieIdFreelaIdService: CreateCategorieIdFreelaIdService;

describe('CreateCategorie', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeFreelaRepository = new FakeFreelaRepository();
    fakeCategorieIdFreelaIdRepository = new FakeCategorieIdFreelaIdRepository();
    createCategorieIdFreelaIdService = new CreateCategorieIdFreelaIdService(
      fakeCategorieIdFreelaIdRepository,
      fakeFreelaRepository,
      fakeCategoriesRepository,
    );
  });

  it('should be able to create a relation bteween categorie and freelas', async () => {
    const user = await fakeUserRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const freela = await fakeFreelaRepository.create({
      description: 'test-jest',
      price: 200,
      title: 'jest application',
      user_id: user.id,
    });

    const categorie = await fakeCategoriesRepository.create('jest-test');

    const categoriesIdFreelaId = await createCategorieIdFreelaIdService.execute(
      {
        freela_id: freela.id,
        categorie_id: categorie.id,
      },
    );

    expect(categoriesIdFreelaId.categorie_id).toBe(categorie.id);
    expect(categoriesIdFreelaId.freela_id).toBe(freela.id);
  });

  it('should not be able to create a relation bteween categorie and freelas if the freela not exist', async () => {
    const categorie = await fakeCategoriesRepository.create('jest-test');

    await expect(
      createCategorieIdFreelaIdService.execute({
        freela_id: 'freela-id',
        categorie_id: categorie.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a relation bteween categorie and freelas if the categorie not exist', async () => {
    const user = await fakeUserRepository.create({
      firstName: 'John',
      lastName: 'Tre',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const freela = await fakeFreelaRepository.create({
      description: 'test-jest',
      price: 200,
      title: 'jest application',
      user_id: user.id,
    });

    await expect(
      createCategorieIdFreelaIdService.execute({
        freela_id: freela.id,
        categorie_id: 'categorie.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
