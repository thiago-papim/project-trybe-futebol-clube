import { LeaderboardResponse } from '../Interfaces/leaderboard/LeaderboardResponse';

const customSort = (a: LeaderboardResponse, b: LeaderboardResponse) => {
  if (a.totalPoints !== b.totalPoints) {
    return b.totalPoints - a.totalPoints;
  }

  if (a.totalVictories !== b.totalVictories) {
    return b.totalVictories - a.totalVictories;
  }

  if (a.goalsBalance !== b.goalsBalance) {
    return b.goalsBalance - a.goalsBalance;
  }

  return b.goalsFavor - a.goalsFavor;
};

export default customSort;
