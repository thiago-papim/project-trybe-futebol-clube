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
}
