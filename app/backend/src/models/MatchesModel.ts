import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { IMatches } from '../Interfaces/matches/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { NewEntity } from '../Interfaces';

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

  async finishMatch(matchId: number): Promise<boolean> {
    const data = await this.model.update(
      { inProgress: false },
      {
        where: { id: matchId },
        returning: true,
      },
    );
    console.log(data);

    if (data[1]) {
      return true;
    }
    return false;
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<boolean> {
    const data = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    if (data) {
      return true;
    }
    return false;
  }

  async createMatch(data: NewEntity<IMatches>): Promise<IMatches> {
    const dataDb = await this.model.create(data);
    const { id,
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatches = dataDb;
    console.log(dataDb);

    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
