import customSort from '../utils/sortCustom';
import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { homeOrAway } from '../Interfaces/matches/IMatches';
import responseLeaderBoard from '../utils/responseLeaderboard';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) { }

  public async findHomeAway(local: homeOrAway) {
    const { matches, teams } = await this.leaderboardModel.findAll();
    const matchesFinish = matches.filter((e) => e.inProgress === false);
    const arrMatches = [];
    for (let i = 0; i < teams.length; i += 1) {
      const match = matchesFinish.filter((e) => e[local] === teams[i].id);
      arrMatches.push(match);
    }
    const response = responseLeaderBoard(arrMatches, teams);
    return response.sort(customSort);
  }

  public async allLeaderboard() {
    const { matches, teams } = await this.leaderboardModel.findAll();
    const matchesFinish = matches.filter((e) => e.inProgress === false);
    const arrMatches = [];
    for (let i = 0; i < teams.length; i += 1) {
      const match = matchesFinish
        .filter((e) => e.homeTeamId === teams[i].id || e.awayTeamId === teams[i].id);
      arrMatches.push(match);
    }
    const response = responseLeaderBoard(arrMatches, teams);
    return response.sort(customSort);
  }
}
