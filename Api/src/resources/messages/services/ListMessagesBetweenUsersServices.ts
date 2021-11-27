import { BadRequestError, NotFoundError } from '@lib/errors';
import IUserRepository from '@resources/users/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import IFindChatsFromUsers from '../dtos/IFindChatsFromUsers';
import Messages from '../infra/database/entities/Messages';
import IMessagesRepository from '../repositories/IMessagesRepository';

interface IResponse extends Messages {
  received: boolean;
}

@injectable()
class ListMessagesBetweenUsersServices {
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

  public async execute(
    senderId: string,
    recipientId: string,
  ): Promise<IResponse[]> {
    if (senderId === recipientId) {
      throw new BadRequestError(
        'It is not possible to hear conversations with yourself.',
      );
    }
    const toUser = await this.userRepository.findById(recipientId);

    if (!toUser) {
      throw new NotFoundError('It was not possible to find the recipient');
    }

    const messages = await this.messagesRepository.findMessages(
      senderId,
      recipientId,
    );

    return messages.map(message => {
      return {
        ...message,
        received: message.to === senderId,
      };
    });
  }
}

export default ListMessagesBetweenUsersServices;
