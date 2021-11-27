import { v4 as uuid } from 'uuid';
import Categories from '@resources/freelas/infra/typeorm/entities/Categories';
import ICategoriesRepository from '../ICategoriesRepository';

class FakeCategoriesRepoitory implements ICategoriesRepository {
  private categories: Categories[] = [];

  public async findById(id: string): Promise<Categories | undefined> {
    const categorie = this.categories.find(item => item.id === id);
    return categorie;
  }

  public async findByName(
    categorieName: string,
  ): Promise<Categories | undefined> {
    const categorie = this.categories.find(
      item => item.name.toLowerCase() === categorieName.toLowerCase(),
    );

    return categorie;
  }

  public async create(name: string): Promise<Categories> {
    const categorie = new Categories();
    categorie.name = name;
    categorie.id = uuid();
    categorie.created_at = new Date();
    categorie.updated_at = new Date();

    this.categories.push(categorie);

    return categorie;
  }
}

export default FakeCategoriesRepoitory;
