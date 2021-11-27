import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@resources/users/services/CreateUserService';
import UpdateProfileService from '@resources/users/services/UpdateProfileService';

class UserController {
  public async create(
    resquest: Request,
    response: Response,
  ): Promise<Response> {
    const { email, firstName, lastName, password } = resquest.body;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      email,
      firstName,
      lastName,
      password,
    });
    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileService = container.resolve(UpdateProfileService);
    const { description, email, firstName, lastName } = request.body;
    const { id } = request.user;

    const user = await updateProfileService.execute({
      id,
      description,
      email,
      firstName,
      lastName,
    });

    return response.status(201).json(user);
  }
}

export default UserController;
