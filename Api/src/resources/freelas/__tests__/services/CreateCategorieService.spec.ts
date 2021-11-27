import CreateCategorieService from '@modules/freelas/services/CreateCategorieService';
import ICategoriesRepository from '@modules/freelas/repositories/ICategoriesRepository';
import FakeCategoriesRepository from '@modules/freelas/repositories/fakes/FakeCategoriesRepository';
import AppError from '@shared/errors/AppError';

let fakeCategoriesRepository: ICategoriesRepository;
let createCategorieService: CreateCategorieService;
describe('CreateCategorie', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategorieService = new CreateCategorieService(
      fakeCategoriesRepository,
    );
  });

  it('should be able to create a new categorie', async () => {
    const categorie = await createCategorieService.execute('test');

    expect(categorie.id).not.toBeNull();
    expect(categorie.name).toBe('test');
  });

  it('should not be able to create a new category if there is a category with the same name but must return to the one that already exists', async () => {
    const categorie = await fakeCategoriesRepository.create('test');

    const aNewCategorie = await createCategorieService.execute('test');

    expect(aNewCategorie.id).toBe(categorie.id);
  });
});
