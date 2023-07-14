import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/matches/IMatches';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async findAll(): Promise<IMatches[]> {
    const arrMatches = await this.matchesModel.findAll();
    return arrMatches;
  }

  public async filterMatches(inProgress: boolean): Promise<IMatches[]> {
    const arrMatches = await this.matchesModel.filterMatches(inProgress);
    console.log(inProgress);

    return arrMatches;
  }
}
