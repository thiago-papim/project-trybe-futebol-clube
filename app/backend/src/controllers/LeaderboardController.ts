import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardController = new LeaderboardService(),
  ) { }

  public async findHome(req: Request, res: Response) {
    const response = await this.leaderboardController.findHomeAway('homeTeamId');
    return res.status(200).json(response);
  }
}
