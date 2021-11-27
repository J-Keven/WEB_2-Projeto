import CreateMessagesServices from '@resources/messages/services/CreateMessagesServices';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class MessagesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { content, to } = req.body;
    const userId = req.user.id;
    const createMessage = container.resolve(CreateMessagesServices);
    const message = await createMessage.execute({
      content,
      to,
      userId,
    });
    return res.status(201).json(message);
  }
}

export default MessagesController;
