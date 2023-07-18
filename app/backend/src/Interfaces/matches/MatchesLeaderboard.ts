import SequelizeMatches from '../../database/models/SequelizeMatches';
import { ITeams } from '../teams/ITeams';

export default interface MatchesLeaderboard extends SequelizeMatches {
  homeTeam: ITeams,
  awayTeam: ITeams,
}
