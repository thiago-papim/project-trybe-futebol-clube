import { ITeams } from '../Interfaces/teams/ITeams';
import { LeaderboardResponse } from '../Interfaces/leaderboard/LeaderboardResponse';
import { IMatches } from '../Interfaces/matches/IMatches';

export default class Leaderboard {
  private matches: IMatches[];
  private teams: ITeams[];
  private team: ITeams;

  constructor(
    matches: IMatches[],
    teams: ITeams[],
    team: ITeams,
  ) {
    this.matches = matches;
    this.teams = teams;
    this.team = team;
  }

  get name() {
    return this.team.teamName;
  }

  get id() {
    return this.team.id;
  }

  get totalPoints() {
    return (this.totalVictories * 3) + this.totalDraws;
  }

  get totalGames() {
    return this.matches.length;
  }

  get homeMatches() {
    return this.matches.filter((e) => e.homeTeamId === this.id);
  }

  get awayMatches() {
    return this.matches.filter((e) => e.awayTeamId === this.id);
  }

  get totalVictories() {
    return this.homeMatches
      .filter((e) => e.homeTeamGoals > e.awayTeamGoals).length + this.awayMatches
      .filter((e) => e.homeTeamGoals < e.awayTeamGoals).length;
  }

  get totalDraws() {
    return this.matches.filter((e) => e.awayTeamGoals === e.homeTeamGoals).length;
  }

  get totalLosses() {
    return this.totalGames - this.totalVictories - this.totalDraws;
  }

  get goalsFavor() {
    const homeGoals = this.homeMatches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    const awayGoals = this.awayMatches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    console.log(this.name, homeGoals + awayGoals);

    return homeGoals + awayGoals;
  }

  get goalsOwn() {
    const homeGoals = this.homeMatches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    const awayGoals = this.awayMatches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    return homeGoals + awayGoals;
  }

  get goalsBalance() {
    return this.goalsFavor - this.goalsOwn;
  }

  get efficiency() {
    return ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  get resultAll(): LeaderboardResponse {
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
