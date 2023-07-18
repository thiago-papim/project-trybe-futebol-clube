import { Router } from 'express';
import teamsRouter from './teams.routes';
import usersRouter from './users.routes';
import matcherRouter from './matches.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matcherRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
