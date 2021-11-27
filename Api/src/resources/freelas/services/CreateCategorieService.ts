import { injectable, inject } from 'tsyringe';
import Categories from '../infra/database/entities/Categories';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
class CreateCategorieService {
  private categoriesRepository: ICategoriesRepository;

  constructor(
    @inject('CategoriesRepository')
    categoriesRepository: ICategoriesRepository,
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  public async execute(categorieName: string): Promise<Categories> {
    const categorie = await this.categoriesRepository.findByName(categorieName);

    if (categorie) {
      return categorie;
    }
    const aNewCategorie = await this.categoriesRepository.create(
      categorieName.toUpperCase(),
    );

    return aNewCategorie;
  }
}

export default CreateCategorieService;
