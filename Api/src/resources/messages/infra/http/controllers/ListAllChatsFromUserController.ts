import CreateMessagesServices from '@resources/messages/services/CreateMessagesServices';
import ListAllChatsFromUsers from '@resources/messages/services/ListAllChatsFromUsers';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListAllChatsFromUserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const createMessage = container.resolve(ListAllChatsFromUsers);
    const message = await createMessage.execute(userId);
    return res.status(200).json(message);
  }
}

export default ListAllChatsFromUserController;
