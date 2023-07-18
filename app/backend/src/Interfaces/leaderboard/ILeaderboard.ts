import { IMatches } from '../matches/IMatches';
import { ITeams } from '../teams/ITeams';

export interface ILeaderboard {
  matches: IMatches[],
  teams: ITeams[]
  // name: string,
  // totalPoints: number,
  // totalGames: number,
  // totalVictories: number,
  // totalDraws: number,
  // totalLosses: number,
  // goalsFavor: number,
  // goalsOwn: number,
  // goalsBalance: number,
  // efficiency: string
}
