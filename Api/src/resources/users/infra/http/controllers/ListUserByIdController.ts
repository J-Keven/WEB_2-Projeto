import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListUserByIdService from '@resources/users/services/ListUserByIdService';

class ListUserByIdController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserByIdService = container.resolve(ListUserByIdService);
    const { id } = request.params;

    const user = await listUserByIdService.execute({
      id,
    });

    return response.status(201).json(user);
  }
}

export default ListUserByIdController;
