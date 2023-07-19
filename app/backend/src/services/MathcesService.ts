import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/matches/IMatches';
import { NewEntity } from '../Interfaces';
import TeamsModel from '../models/TeamsModel';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { MatchesResponse } from '../Interfaces/matches/MatchesResponse';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async findAll(): Promise<IMatches[]> {
    const arrMatches = await this.matchesModel.findAll();
    return arrMatches;
  }

  public async filterMatches(inProgress: boolean): Promise<IMatches[]> {
    const arrMatches = await this.matchesModel.filterMatches(inProgress);
    return arrMatches;
  }

  public async finishMatch(id: number): Promise<boolean> {
    const matchFinish = await this.matchesModel.finishMatch(id);
    return matchFinish;
  }

  public async updateMatch(
    id:number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const data = await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return data;
  }

  public async createMatch(match: NewEntity<IMatches>): Promise<MatchesResponse> {
    if (match.homeTeamId === match.awayTeamId) {
      return { code: 422,
        message: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeam = await this.teamsModel.findById(match.homeTeamId);
    const awayTeam = await this.teamsModel.findById(match.awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { code: 404, message: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchesModel.createMatch(match);
    return { code: 201, message: newMatch };
  }
}
