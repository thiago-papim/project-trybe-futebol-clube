export type homeOrAway = 'homeTeamId' | 'awayTeamId';

export interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  local?: homeOrAway,
  // homeTeam: {
  //   teamName: string
  // },
  // awayTeam: {
  //   teamName: string
  // }
}
