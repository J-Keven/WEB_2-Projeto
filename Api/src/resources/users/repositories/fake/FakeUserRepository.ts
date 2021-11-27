import Users from '@resources/users/infra/typeorm/entities/Users';
import ICreateUserDTO from '@resources/users/dtos/ICreateUserDTO';
import IUserRepository from '../IUserRepository';

class FakeUserRepository implements IUserRepository {
  private userRepository: Users[] = [];

  public async findById(id: string): Promise<Users | undefined> {
    const user = this.userRepository.find(userItem => userItem.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = this.userRepository.find(userItem => userItem.email === email);
    return user;
  }

  public async create({
    firstName,
    lastName,
    email,
    password,
  }: ICreateUserDTO): Promise<Users> {
    const user = new Users();
    Object.assign(user, {
      firstName,
      lastName,
      email,
      password,
    });

    this.userRepository.push(user);

    return user;
  }

  public async save(userData: Users): Promise<Users> {
    const index = this.userRepository.findIndex(
      user => user.id === userData.id,
    );

    if (index === -1) {
      this.userRepository.push(userData);
    } else {
      this.userRepository[index] = userData;
    }
    return userData;
  }
}

export default FakeUserRepository;
