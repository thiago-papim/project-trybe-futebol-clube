import { Request, Response } from 'express';
import MatchesService from '../services/MathcesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async matches(req: Request, res: Response) {
    if (req.query.inProgress) {
      const serviceResponse = await this.matchesService
        .filterMatches(req.query.inProgress === 'true');
      return res.status(200).json(serviceResponse);
    }
    const serviceResponse = await this.matchesService.findAll();
    return res.status(200).json(serviceResponse);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.matchesService.finishMatch(Number(id));
    if (data) {
      return res.status(200).json({ message: 'Finished' });
    }
    return res.status(200).json({ message: 'Partida já encerrada' });
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Jogo atualizado' });
  }

  public async createMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchesService
      .createMatch({ ...req.body, inProgress: true });
    console.log(serviceResponse.message);
    return res.status(serviceResponse.code).json(serviceResponse.message);
  }
}
