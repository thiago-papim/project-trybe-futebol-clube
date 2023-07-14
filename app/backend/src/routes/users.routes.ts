import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UserController';
import login from '../middlewares/validateLogin';

const usersController = new UsersController();

const router = Router();

router.post('', login, (req: Request, res: Response) => usersController.login(req, res));

export default router;
