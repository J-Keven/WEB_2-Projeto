import { inject, injectable } from 'tsyringe';
import Categories from '../infra/database/entities/Categories';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
class ListAllCategoriesServices {
  private categoriesRepository: ICategoriesRepository;

  constructor(
    @inject('CategoriesRepository')
    categoriesRepository: ICategoriesRepository,
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  public async execute(): Promise<Categories[]> {
    return this.categoriesRepository.findAll();
  }
}

export default ListAllCategoriesServices;
