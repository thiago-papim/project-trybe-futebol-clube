import { ITeams } from '../Interfaces/teams/ITeams';
import { LeaderboardResponse } from '../Interfaces/leaderboard/LeaderboardResponse';
import { IMatches } from '../Interfaces/matches/IMatches';

export default class Leaderboard {
  private matches: IMatches[];
  private local: 'homeTeamId' | 'awayTeamId';
  private teams: ITeams[];
  private homeTeamGoals: 'homeTeamGoals' | 'awayTeamGoals';
  private awayTeamGoals: 'awayTeamGoals' | 'homeTeamGoals';

  constructor(
    matches: IMatches[],
    homeOrAway: 'homeTeamId' | 'awayTeamId',
    teams: ITeams[],
  ) {
    this.matches = matches;
    this.local = homeOrAway;
    this.teams = teams;
    this.homeTeamGoals = this.local === 'homeTeamId' ? 'homeTeamGoals' : 'awayTeamGoals';
    this.awayTeamGoals = this.homeTeamGoals === 'homeTeamGoals' ? 'awayTeamGoals' : 'homeTeamGoals';
  }

  get name() {
    const teamName = this.teams
      .find((e) => e.id === this.matches[1][this.local])?.teamName;
    return teamName;
  }

  get totalPoints() {
    return (this.totalVictories * 3) + this.totalDraws;
  }

  get totalGames() {
    return this.matches.length;
  }

  get totalVictories() {
    return this.matches.filter((e) => e[this.homeTeamGoals] > e[this.awayTeamGoals]).length;
  }

  get totalDraws() {
    return this.matches.filter((e) => e[this.homeTeamGoals] === e[this.awayTeamGoals]).length;
  }

  get totalLosses() {
    return this.matches.filter((e) => e[this.homeTeamGoals] < e[this.awayTeamGoals]).length;
  }

  get goalsFavor() {
    return this.matches.reduce((acc, curr) => acc + curr[this.homeTeamGoals], 0);
  }

  get goalsOwn() {
    return this.matches.reduce((acc, curr) => acc + curr[this.awayTeamGoals], 0);
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
