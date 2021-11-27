import { Response, Request } from 'express';
import { container } from 'tsyringe';
import AuthenticatedService from '@resources/users/services/AutheticadedUserService';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticatedService = container.resolve(AuthenticatedService);

    const session = await authenticatedService.execute({ email, password });

    return response.status(201).json(session);
  }
}

export default SessionController;
