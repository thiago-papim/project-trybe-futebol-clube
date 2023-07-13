import { ITeams } from './ITeams';

export interface ITeamsModel {
  findAll() : Promise<ITeams[]>,
  findById(id: ITeams['id']): Promise<ITeams | null>
}
