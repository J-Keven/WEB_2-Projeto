import ensureAuthenticated from '@infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import CategoriesControllers from '../controllers/CategoriesControllers';

const categoriesRoutes = Router();
const categoriesControllers = new CategoriesControllers();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.get('/', categoriesControllers.index);

export default categoriesRoutes;
