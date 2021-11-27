import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListAllCategoriesServices from '@resources/freelas/services/ListAllCategoriesServices';

class CategoriesControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const listAllCategoriesServices = container.resolve(
      ListAllCategoriesServices,
    );

    const categories = await listAllCategoriesServices.execute();
    return res.status(200).json(categories);
  }
}

export default CategoriesControllers;
