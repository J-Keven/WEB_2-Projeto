import IFindChatsFromUsers from '@resources/messages/dtos/IFindChatsFromUsers';
import IMessage from '@resources/messages/dtos/IMessage';
import IMessagesRepository from '@resources/messages/repositories/IMessagesRepository';
import { getRepository, Repository } from 'typeorm';
import Messages from '../entities/Messages';

class MessagesRepository implements IMessagesRepository {
  private ormRepository: Repository<Messages>;

  constructor() {
    this.ormRepository = getRepository(Messages);
  }

  public async findMessages(
    senderId: string,
    recipientId: string,
  ): Promise<Messages[]> {
    return this.ormRepository.query(
      `
      SELECT 
      * 
       FROM 
         messages as a 
       WHERE 
         (
          a.to = $1 
            AND 
          a."from" = $2
         ) 
          or 
        (
          a.to = $2
            AND 
          a."from" = $1
         )
      `,
      [senderId, recipientId],
    );
  }

  public async findChatsFromUsers(
    userId: string,
  ): Promise<IFindChatsFromUsers[]> {
    return this.ormRepository.query(
      `
        SELECT
          DISTINCT(a.id),
          a.avatar,
          a."firstName",
          a."lastName"
        FROM users as A INNER JOIN (SELECT c.to, c.from
          FROM "messages" as C WHERE 
            "to" = $1 
            OR "from" = $1 
              ORDER BY c.created_at) as B 
            ON b.to = a.id OR b.from = a.id 
        WHERE a.id != $1
      `,
      [userId],
    );
  }

  public async create(data: IMessage): Promise<Messages> {
    const message = this.ormRepository.create({
      from: data.from,
      content: data.content,
      to: data.to,
    });

    await this.ormRepository.save(message);
    return message;
  }
}

export default MessagesRepository;
