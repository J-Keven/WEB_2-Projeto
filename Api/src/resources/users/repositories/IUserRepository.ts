import Users from '../infra/database/entities/Users';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findById(id: string): Promise<Users | undefined>;
  findByEmail(email: string): Promise<Users | undefined>;
  create(data: ICreateUserDTO): Promise<Users>;
  save(user: Users): Promise<Users>;
}
