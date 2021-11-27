import { v4 as uuid } from 'uuid';
import CategorieIdFreelaId from '@resources/freelas/infra/typeorm/entities/CategorieIDFreelaId';
import ICreateCategorieIdFreelaId from '@resources/freelas/dtos/ICreateCategorieIdFreelaId';
import ICategorieIdFreelaIdRepository from '../ICategorieIdFreelaIdRepository';

class FakeCategorieIdFreelaIdRepository
  implements ICategorieIdFreelaIdRepository {
  findByFreelaId(id: string): Promise<CategorieIdFreelaId[]> {
    throw new Error('Method not implemented.');
  }

  private categorieIdFreelaIds: CategorieIdFreelaId[] = [];

  public async create({
    categorie_id,
    freela_id,
  }: ICreateCategorieIdFreelaId): Promise<CategorieIdFreelaId> {
    const categorieIdFreelaId = new CategorieIdFreelaId();
    Object.assign(categorieIdFreelaId, {
      id: uuid(),
      categorie_id,
      freela_id,
    });

    this.categorieIdFreelaIds.push(categorieIdFreelaId);
    return categorieIdFreelaId;
  }
}

export default FakeCategorieIdFreelaIdRepository;
