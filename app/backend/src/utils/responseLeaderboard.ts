import { ITeams } from '../Interfaces/teams/ITeams';
import { IMatches } from '../Interfaces/matches/IMatches';
import Leaderboard from './LeaderboardTwo';

const responseLeaderBoard = (arrMatches: IMatches[][], teams: ITeams[]) => {
  const response = arrMatches.map((Matches, i) => {
    const team = teams[i];
    const result = new Leaderboard(Matches, teams, team);
    return result.resultAll;
  });
  return response;
};

export default responseLeaderBoard;
