import ensureAuthenticated from '@infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import MessagesController from '../controllers/MessagesController';

const messagesRoutes = Router();

messagesRoutes.use(ensureAuthenticated);
const messagesController = new MessagesController();

messagesRoutes.post('/', messagesController.create);

export default messagesRoutes;
