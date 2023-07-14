import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { IMatches } from '../Interfaces/matches/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;
  private teamInclude = [
    { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
    { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
  ];

  async findAll(): Promise<IMatches[]> {
    const data = await this.model.findAll({
      include: this.teamInclude,
    });
    return data;
  }

  async filterMatches(inProgress: boolean): Promise<IMatches[]> {
    const data = await this.model.findAll({
      include: this.teamInclude,
    });
    return data.filter((match) => match.inProgress === inProgress);
  }
}
