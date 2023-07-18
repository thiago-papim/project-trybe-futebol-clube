import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req: Request, res: Response) => leaderboardController.findHome(req, res));
router.get('/away', (req: Request, res: Response) => leaderboardController.findAway(req, res));
router.get('/', (req: Request, res: Response) => leaderboardController.allLeaderBoard(req, res));

export default router;
