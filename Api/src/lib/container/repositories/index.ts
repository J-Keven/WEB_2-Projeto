import ICategoriesRepository from '@resources/freelas/repositories/ICategoriesRepository';
import IFreelaRepository from '@resources/freelas/repositories/IFreelaRepository';
import CategoriesRepository from '@resources/freelas/infra/database/repositories/CategoriesRepository';
import UserRepository from '@resources/users/infra/database/repositories/UserRepository';
import IUserRepository from '@resources/users/repositories/IUserRepository';
import { container } from 'tsyringe';
import FreelasRepository from '@resources/freelas/infra/database/repositories/FreelaRepository';
import IMessagesRepository from '@resources/messages/repositories/IMessagesRepository';
import MessagesRepository from '@resources/messages/infra/database/repositories/MessagesRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IFreelaRepository>(
  'FreelaRepository',
  FreelasRepository,
);

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  MessagesRepository,
);
