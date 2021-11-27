import ICreateFreelasDTO from '@resources/freelas/dtos/ICreateFreelasDTO';
import Freelas from '@resources/freelas/infra/database/entities/Freelas';

export default interface IFreelasRepository {
  findByStatus(status: string, page: number): Promise<Freelas[]>;
  findAllOfUser(status: string, page: number): Promise<Freelas[]>;
  findAll(status: string, page: number): Promise<Freelas[]>;
  findById(id: string): Promise<Freelas | undefined>;
  create(data: ICreateFreelasDTO): Promise<Freelas>;
  save(freela: Freelas): Promise<Freelas>;
}
