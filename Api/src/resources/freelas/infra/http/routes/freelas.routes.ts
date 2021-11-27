import { Router } from 'express';
import uploadConfigs from '@configs/uploads';

import ensureAuthenticated from '@infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import FreelasController from '../controllers/FreelasController';
import ListAllFreelasByStatusController from '../controllers/ListAllFreelasByStatusController';
import ListFreelaByIdController from '../controllers/ListFreelaByIdController';
import ListAllFreelasOfUserController from '../controllers/ListAllFreelasOfUserController';

const upload = multer({
  storage: uploadConfigs.multer,
});

const freelasRoutes = Router();
const freelasController = new FreelasController();
const listAllFreelasByStatusController = new ListAllFreelasByStatusController();
const listFreelaByIdController = new ListFreelaByIdController();
const listAllFreelasOfUserController = new ListAllFreelasOfUserController();
freelasRoutes.use(ensureAuthenticated);

freelasRoutes.get('/:id', listFreelaByIdController.index);
freelasRoutes.get('/', listAllFreelasByStatusController.index);
freelasRoutes.post('/', upload.single('image'), freelasController.create);
freelasRoutes.patch('/:freelaId', freelasController.update);

export default freelasRoutes;
