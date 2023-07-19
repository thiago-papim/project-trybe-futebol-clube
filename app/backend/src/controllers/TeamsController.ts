import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const serviceResponse = await this.teamsService.findAll();
    res.status(200).json(serviceResponse);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamsService.findById(Number(id));
    res.status(200).json(serviceResponse);
  }
}
