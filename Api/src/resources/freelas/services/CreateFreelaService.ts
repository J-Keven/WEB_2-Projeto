import { injectable, inject } from 'tsyringe';
import IUserRepository from '@resources/users/repositories/IUserRepository';
import { AuthorizationError } from '@lib/errors';
import IStorageProvader from '@lib/adapters/StorageProvider/model/IStorageProvider';
import Freelas from '../infra/database/entities/Freelas';
import IFreelaRepository from '../repositories/IFreelaRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import Categories from '../infra/database/entities/Categories';

interface IRequestDTO {
  userId: string;
  title: string;
  description: string;
  price: number;
  categories: string[];
  filename: string;
}

@injectable()
class CreateFreelaService {
  private freelaRepository: IFreelaRepository;

  private userRepository: IUserRepository;

  private categoriesRepository: ICategoriesRepository;

  constructor(
    @inject('FreelaRepository')
    freelaRepository: IFreelaRepository,
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('CategoriesRepository')
    categoriesRepository: ICategoriesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvader,
  ) {
    this.freelaRepository = freelaRepository;
    this.userRepository = userRepository;
    this.categoriesRepository = categoriesRepository;
  }

  public async execute({
    userId,
    title,
    description,
    price,
    categories,
    filename,
  }: IRequestDTO): Promise<Freelas> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AuthorizationError();
    }

    const freelaCategory: Categories[] = [];

    await Promise.all(
      categories.map(async cat => {
        let category = await this.categoriesRepository.findByName(cat);

        if (!category) {
          category = await this.categoriesRepository.create(cat);
        }

        freelaCategory.push(category);
      }),
    );

    const freela = await this.freelaRepository.create({
      userId,
      title,
      description,
      price,
      categories: freelaCategory,
      filename,
    });
    await this.storageProvider.save(filename);
    await this.freelaRepository.save(freela);

    return freela;
  }
}

export default CreateFreelaService;
