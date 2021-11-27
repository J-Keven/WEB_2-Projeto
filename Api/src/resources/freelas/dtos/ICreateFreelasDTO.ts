import Categories from '../infra/database/entities/Categories';

export default interface ICreateFreelasDTO {
  userId: string;
  title: string;
  description: string;
  price: number;
  categories: Categories[];
  filename: string;
}
