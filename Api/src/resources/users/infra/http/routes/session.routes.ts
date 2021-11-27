import { Router } from 'express';
import SessionController from '../controllers/SessionController';

const sessionRutes = Router();

const sessionController = new SessionController();
sessionRutes.post('/', sessionController.create);

export default sessionRutes;
