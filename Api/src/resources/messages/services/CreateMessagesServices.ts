import { BadRequestError, NotFoundError } from '@lib/errors';
import IUserRepository from '@resources/users/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import Messages from '../infra/database/entities/Messages';
import IMessagesRepository from '../repositories/IMessagesRepository';

interface IRequest {
  content: string;
  to: string;
  userId: string;
}

@injectable()
class CreateMessagesServices {
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

  public async execute(data: IRequest): Promise<Messages> {
    if (data.to === data.userId) {
      throw new BadRequestError('A user cannot message himself.');
    }
    const toUser = await this.userRepository.findById(data.to);

    if (!toUser) {
      throw new NotFoundError('It was not possible to find the recipient');
    }

    return this.messagesRepository.create({
      content: data.content,
      from: data.userId,
      to: toUser.id,
    });
  }
}

export default CreateMessagesServices;
