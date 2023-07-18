import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async findHome(req: Request, res: Response) {
    const response = await this.leaderboardService.findHomeAway('homeTeamId');
    return res.status(200).json(response);
  }

  public async findAway(req: Request, res: Response) {
    const response = await this.leaderboardService.findHomeAway('awayTeamId');
    return res.status(200).json(response);
  }

  public async allLeaderBoard(req: Request, res: Response) {
    const response = await this.leaderboardService.allLeaderboard();
    return res.status(200).json(response);
  }
}
