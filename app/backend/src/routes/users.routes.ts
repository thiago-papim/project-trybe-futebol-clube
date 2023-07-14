import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UserController';
import LoginRole from '../middlewares/loginToken';

const usersController = new UsersController();
const loginRole = new LoginRole();

const router = Router();

router.post('', (req: Request, res: Response) => usersController.login(req, res));
router.get('/role', (req: Request, res: Response) => loginRole.validatePassword(req, res));
export default router;
