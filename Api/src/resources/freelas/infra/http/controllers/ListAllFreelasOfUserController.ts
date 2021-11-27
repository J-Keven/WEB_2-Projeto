import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllFreelasOfUserService from '@resources/freelas/services/ListAllFreelasOfUserService';

class ListAllFreelasOfUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    let user_id = request.user.id;
    const { id } = request.params as {
      id: string | undefined;
    };

    if (id) {
      user_id = id;
    }

    const listAllFreelasOfUserService = container.resolve(
      ListAllFreelasOfUserService,
    );

    const freelas = await listAllFreelasOfUserService.execute(user_id);

    return response.status(201).json(freelas);
  }
}

export default ListAllFreelasOfUserController;
