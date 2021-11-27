import { BadRequestError, NotFoundError } from '@lib/errors';
import IUserRepository from '@resources/users/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import IFindChatsFromUsers from '../dtos/IFindChatsFromUsers';
import Messages from '../infra/database/entities/Messages';
import IMessagesRepository from '../repositories/IMessagesRepository';

interface IResponse extends Omit<IFindChatsFromUsers, 'avatar'> {
  avatar_url: string | null;
}

@injectable()
class ListAllChatsFromUsers {
  public userRepository: IUserRepository;

  public messagesRepository: IMessagesRepository;

  constructor(
    @inject('UserRepository')
    userRepository: IUserRepository,
    @inject('MessagesRepository')
    messagesRepository: IMessagesRepository,
  ) {
    this.userRepository = userRepository;
    this.messagesRepository = messagesRepository;
  }

  public async execute(userId: string): Promise<IResponse[]> {
    const chats = await this.messagesRepository.findChatsFromUsers(userId);
    return chats.map(chat => {
      let avatar_url = chat.avatar;
      if (chat.avatar) {
        avatar_url = `http://localhost:3333/files/${chat.avatar}`;
      }
      return {
        firstName: chat.firstName,
        lastName: chat.lastName,
        id: chat.id,
        avatar_url,
      };
    });
  }
}

export default ListAllChatsFromUsers;
