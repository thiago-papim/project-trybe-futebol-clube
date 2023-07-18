import customSort from '../utils/sortCustom';
import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import Leaderboard from '../utils/Leaderboard';
// import Leaderboard from '../utils/Leaderboard';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) { }

  public async findHomeAway(local: string) {
    const { matches, teams } = await this.leaderboardModel.findAll();
    const locations = local === 'homeTeamId' ? 'homeTeamId' : 'awayTeamId';
    const arrMatches = [];
    for (let i = 0; i < teams.length; i += 1) {
      const match = matches.filter((e) => e[locations] === teams[i].id);
      arrMatches.push(match);
    }
    // console.log(arrMatches);
    const response = arrMatches.map((Matches) => {
      const result = new Leaderboard(Matches, locations, teams);
      // console.log(result.name);

      return result.result;
    });
    // console.log(response);
    return response.sort(customSort);
  }
}
