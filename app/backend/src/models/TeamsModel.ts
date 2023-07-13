import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import { ITeams } from '../Interfaces/ITeams';
// import { NewEntity } from '../Interfaces';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const data = await this.model.findAll();
    return data.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: number): Promise<ITeams | null> {
    const team = await this.model.findByPk(id);
    if (!team) {
      return null;
    }
    return team;
  }
}
