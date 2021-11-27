import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListFreelaByIdService from '@resources/freelas/services/ListFreelaByIdService';

class ListFreelaByIdController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listFreelaByIdService = container.resolve(ListFreelaByIdService);

    const freela = await listFreelaByIdService.execute(id);

    return response.status(201).json(freela);
  }
}

export default ListFreelaByIdController;
