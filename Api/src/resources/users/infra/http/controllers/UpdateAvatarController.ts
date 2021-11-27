import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateAvatarService from '@resources/users/services/UpdateAvatarService';

class UpdateAvatarController {
  public async index(request: Request, response: Response): Promise<Response> {
    const updateAvatarService = container.resolve(UpdateAvatarService);

    const { filename } = request.file;
    const { id } = request.user;
    const user = await updateAvatarService.execute({
      filename,
      id,
    });

    return response.status(201).json(user);
  }
}

export default UpdateAvatarController;
