import { Router } from 'express';
import userRoutes from '@resources/users/infra/http/routes/user.routes';
import sessionRoutes from '@resources/users/infra/http/routes/session.routes';
import freelaRoutes from '@resources/freelas/infra/http/routes/freelas.routes';
import categoriesRoutes from '@resources/freelas/infra/http/routes/categories.routes';
import messagesRoutes from '@resources/messages/infra/http/routes/messages.routes';

const routes = Router();
routes.use('/users', userRoutes);
routes.use('/login', sessionRoutes);
routes.use('/freela', freelaRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/messages', messagesRoutes);

export default routes;
