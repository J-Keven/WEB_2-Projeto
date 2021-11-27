import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateFreelaService from '@resources/freelas/services/CreateFreelaService';
import UpdateFreelasService from '@resources/freelas/services/UpdateFreelasService';

class FreelasController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, price, categories } = request.body;
    const userId = request.user.id;

    const { filename } = request.file;
    const createFreelaService = container.resolve(CreateFreelaService);

    const categoriesArray = String(categories)
      .split(',')
      .map(item => item.trim());

    const freela = await createFreelaService.execute({
      userId,
      title,
      description,
      price,
      categories: String(categories)
        .split(',')
        .map(item => item.trim()),
      filename,
    });

    return response.status(201).json(freela);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { freelaId } = request.params;
    const { description, status, categories } = request.body;

    const updateFreelasService = container.resolve(UpdateFreelasService);
    console.log(status);
    const freela = await updateFreelasService.execute({
      freelaId,
      status: status as 'open' | 'in-progress' | 'concluded',
      userId: id,
    });

    return response.status(201).json(freela);
  }
}

export default FreelasController;
