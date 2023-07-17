import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll() : Promise<IMatches[]>,
  filterMatches(filter: boolean): Promise<IMatches[]>,
  finishMatch(id: number): Promise<boolean>,
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<boolean>,
  createMatch(data: Partial<IMatches>): Promise<IMatches>
}
