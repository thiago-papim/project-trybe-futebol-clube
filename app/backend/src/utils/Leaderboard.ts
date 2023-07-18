import { ITeams } from '../Interfaces/teams/ITeams';
import { LeaderboardResponse } from '../Interfaces/leaderboard/LeaderboardResponse';
import { IMatches } from '../Interfaces/matches/IMatches';

export default class Leaderboard {
  private matches: IMatches[];
  private local: string;
  private teams: ITeams[];

  constructor(matches: IMatches[], homeOrAway: string, teams: ITeams[]) {
    this.matches = matches;
    this.local = homeOrAway;
    this.teams = teams;
  }

  get name() {
    const teamName = this.teams
      .find((e) => e.id === this.matches[1].homeTeamId)?.teamName;
    return teamName;
  }

  get totalPoints() {
    return (this.totalVictories * 3) + this.totalDraws;
  }

  get totalGames() {
    return this.matches.length;
  }

  get totalVictories() {
    return this.matches.filter((e) => e.homeTeamGoals > e.awayTeamGoals).length;
  }

  get totalDraws() {
    return this.matches.filter((e) => e.homeTeamGoals === e.awayTeamGoals).length;
  }

  get totalLosses() {
    return this.matches.filter((e) => e.homeTeamGoals < e.awayTeamGoals).length;
  }

  get goalsFavor() {
    return this.matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
  }

  get goalsOwn() {
    return this.matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
  }

  get goalsBalance() {
    return this.goalsFavor - this.goalsOwn;
  }

  get efficiency() {
    return ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  get result(): LeaderboardResponse {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}
