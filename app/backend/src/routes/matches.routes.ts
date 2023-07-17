import { Request, Router, Response, NextFunction } from 'express';
import MatchesController from '../controllers/MatchesController';
import LoginRole from '../middlewares/loginToken';

const matchesController = new MatchesController();
const verify = new LoginRole();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.matches(req, res));
router.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) => verify.validateToken(req, res, next),
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
router.patch(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => verify.validateToken(req, res, next),
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
router.post(
  '',
  (req: Request, res: Response, next: NextFunction) => verify.validateToken(req, res, next),
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
