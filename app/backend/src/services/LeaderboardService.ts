import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { TeamTable } from '../interfaces';

export const generateTable = async () => {
  const allClubs = await TeamsModel.findAll({ raw: true });
  const tableGenerated = allClubs.map((club) => {
    const table = {
      id: club.id,
      name: club.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
    return table;
  });
  return tableGenerated;
};

export const generateWin = (match: MatchesModel, club: TeamTable, status: 'home' | 'away') => {
  const results = club;
  const { homeTeamGoals, awayTeamGoals } = match;
  results.totalGames += 1;
  results.totalVictories += 1;
  results.totalPoints += 3;
  results.goalsFavor += status === 'home' ? homeTeamGoals : awayTeamGoals;
  results.goalsOwn += status === 'home' ? awayTeamGoals : homeTeamGoals;
  results.goalsBalance = results.goalsFavor - results.goalsOwn;
  results.efficiency = Number(
    ((results.totalPoints / (results.totalGames * 3)) * 100).toFixed(2),
  );
  return results;
};

export const generateDraw = (match: MatchesModel, club: TeamTable, status: 'home' | 'away') => {
  const results = club;
  const { homeTeamGoals, awayTeamGoals } = match;
  results.totalGames += 1;
  results.totalDraws += 1;
  results.totalPoints += 1;
  results.goalsFavor += status === 'home' ? homeTeamGoals : awayTeamGoals;
  results.goalsOwn += status === 'home' ? awayTeamGoals : homeTeamGoals;
  results.goalsBalance = results.goalsFavor - results.goalsOwn;
  results.efficiency = Number(
    ((results.totalPoints / (results.totalGames * 3)) * 100).toFixed(2),
  );
  return results;
};

export const generateLoss = (match: MatchesModel, club: TeamTable, status: 'home' | 'away') => {
  const results = club;
  const { homeTeamGoals, awayTeamGoals } = match;
  results.totalGames += 1;
  results.totalLosses += 1;
  results.goalsFavor += status === 'home' ? homeTeamGoals : awayTeamGoals;
  results.goalsOwn += status === 'home' ? awayTeamGoals : homeTeamGoals;
  results.goalsBalance = results.goalsFavor - results.goalsOwn;
  results.efficiency = Number(
    ((results.totalPoints / (results.totalGames * 3)) * 100).toFixed(2),
  );
  return results;
};

export const updateTableHome = (match: MatchesModel, club: TeamTable) => {
  const { homeTeamGoals, awayTeamGoals } = match;
  const HOME = 'home';
  if (homeTeamGoals > awayTeamGoals) {
    return generateWin(match, club, HOME);
  }
  if (homeTeamGoals === awayTeamGoals) {
    return generateDraw(match, club, HOME);
  }
  return generateLoss(match, club, HOME);
};

export const updateTableAway = (match: MatchesModel, club: TeamTable) => {
  const { homeTeamGoals, awayTeamGoals } = match;
  const AWAY = 'away';
  if (homeTeamGoals < awayTeamGoals) {
    return generateWin(match, club, AWAY);
  }
  if (homeTeamGoals === awayTeamGoals) {
    return generateDraw(match, club, AWAY);
  }
  return generateLoss(match, club, AWAY);
};

export const generateLeaderboardHome = async () => {
  const table = await generateTable();
  const allMatchs = await MatchesModel.findAll({ raw: true, where: { inProgress: false } });

  const leaderboardHome = table.map((club) => {
    allMatchs.forEach((match) => {
      if (match.homeTeam === club.id) updateTableHome(match, club as TeamTable);
    });
    return club;
  });

  return leaderboardHome;
};

export const generateLeaderboardAway = async () => {
  const table = await generateTable();
  const allMatchs = await MatchesModel.findAll({ raw: true, where: { inProgress: false } });

  const leaderboardHome = table.map((club) => {
    allMatchs.forEach((match) => {
      if (match.awayTeam === club.id) updateTableAway(match, club as TeamTable);
    });
    return club;
  });

  return leaderboardHome;
};

export const orderLeaderboard = (leaderboard: TeamTable[]) => {
  leaderboard.sort((a, b) => a.goalsFavor - b.goalsFavor);
  leaderboard.sort((a, b) => b.goalsFavor - a.goalsFavor);
  leaderboard.sort((a, b) => b.goalsBalance - a.goalsBalance);
  leaderboard.sort((a, b) => b.totalVictories - a.totalVictories);
  leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
  const leaderboardExcludingId = leaderboard.map((club) => {
    // # Código abaixo visto em:
    // https://www.cloudhadoop.com/2020/02/different-ways-of-remove-property-in.html
    const { id, ...clubObject } = club;

    return clubObject;
  });
  return leaderboardExcludingId;
};

export const generateOrderedLeaderboardHome = async () => {
  const leaderboardHome = await generateLeaderboardHome();
  const leaderboardOrdered = orderLeaderboard(leaderboardHome);

  return leaderboardOrdered;
};

export const generateOrderedLeaderboardAway = async () => {
  const leaderboardAway = await generateLeaderboardAway();
  const leaderboardOrdered = await orderLeaderboard(leaderboardAway);
  return leaderboardOrdered;
};

export const generateLeaderboard = async () => {
  const leaderboardHome = await generateLeaderboardHome();
  const leaderboardAway = await generateLeaderboardAway();
  for (let index = 0; index < leaderboardHome.length; index += 1) {
    leaderboardHome[index].totalGames += leaderboardAway[index].totalGames;
    leaderboardHome[index].totalVictories += leaderboardAway[index].totalVictories;
    leaderboardHome[index].totalPoints += leaderboardAway[index].totalPoints;
    leaderboardHome[index].totalDraws += leaderboardAway[index].totalDraws;
    leaderboardHome[index].totalLosses += leaderboardAway[index].totalLosses;
    leaderboardHome[index].goalsFavor += leaderboardAway[index].goalsFavor;
    leaderboardHome[index].goalsOwn += leaderboardAway[index].goalsOwn;
    leaderboardHome[index].goalsBalance = (
      leaderboardHome[index].goalsFavor - leaderboardHome[index].goalsOwn);
    leaderboardHome[index].efficiency = Number((
      (leaderboardHome[index].totalPoints / (leaderboardHome[index].totalGames * 3)) * 100)
      .toFixed(2));
  }
  return leaderboardHome;
};

export const generateOrderedLeaderboard = async () => {
  const leaderboard = await generateLeaderboard();
  const leaderboardOrdered = orderLeaderboard(leaderboard);
  return leaderboardOrdered;
};
