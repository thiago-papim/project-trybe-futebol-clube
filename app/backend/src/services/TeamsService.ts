import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import TeamsModel from '../models/TeamsModel';
import { ITeams } from '../Interfaces/teams/ITeams';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async findAll(): Promise<ITeams[]> {
    const arrTeams = await this.teamsModel.findAll();
    return arrTeams;
  }

  public async findById(id: number): Promise<ITeams | null> {
    const team = await this.teamsModel.findById(id);
    return team;
  }
}
