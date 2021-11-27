import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllFreelasByStatusService from '@resources/freelas/services/ListAllFreelasService';

class ListAllFreelasInOpenController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { status, page } = request.query;

    const listAllFreelasByStatusService = container.resolve(
      ListAllFreelasByStatusService,
    );

    const freelas = await listAllFreelasByStatusService.execute(
      String(status),
      Number(page) || 1,
    );

    return response.status(201).json(freelas);
  }
}

export default ListAllFreelasInOpenController;
