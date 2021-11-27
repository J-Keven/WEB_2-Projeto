import ListMessagesBetweenUsersServices from '@resources/messages/services/ListMessagesBetweenUsersServices';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ListMessagesFromUserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const senderId = req.user.id;
    const { userId } = req.params;
    const listMessages = container.resolve(ListMessagesBetweenUsersServices);
    const message = await listMessages.execute(senderId, userId);
    return res.status(200).json(message);
  }
}
export default ListMessagesFromUserController;
