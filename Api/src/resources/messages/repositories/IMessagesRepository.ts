import IFindChatsFromUsers from '../dtos/IFindChatsFromUsers';
import IMessage from '../dtos/IMessage';
import Messages from '../infra/database/entities/Messages';

export default interface IMessagesRepository {
  create(data: IMessage): Promise<Messages>;
  findChatsFromUsers(userId: string): Promise<IFindChatsFromUsers[]>;
  findMessages(senderId: string, recipientId: string): Promise<Messages[]>;
}
