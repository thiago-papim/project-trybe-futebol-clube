import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
// import { NewEntity } from '../Interfaces';

export default class LeaderboardModel implements ILeaderboardModel {
  private model = SequelizeMatches;
  private teamsModel = SequelizeTeams;
  private teamInclude = [
    { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
    { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
  ];

  async findAll(): Promise<ILeaderboard> {
    const matches = await this.model.findAll({
      include: this.teamInclude,
    });
    const teams = await this.teamsModel.findAll();
    return { matches, teams };
  }
}
