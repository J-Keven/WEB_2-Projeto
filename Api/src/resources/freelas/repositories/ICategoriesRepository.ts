import Categories from '@resources/freelas/infra/database/entities/Categories';

export default interface ICategoriesRepository {
  findById(id: string): Promise<Categories | undefined>;
  findByName(categorieName: string): Promise<Categories | undefined>;
  findAll(): Promise<Categories[]>;
  create(categorieName: string): Promise<Categories>;
}
