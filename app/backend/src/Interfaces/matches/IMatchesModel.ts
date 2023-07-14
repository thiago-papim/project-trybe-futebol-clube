import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll() : Promise<IMatches[]>,
  filterMatches(filter: boolean): Promise<IMatches[]>
}
