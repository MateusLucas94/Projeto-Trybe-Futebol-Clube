import MatchesModel from '../database/models/MatchesModel';

export interface Login {
  email: string,
  password: string
}

export interface Matches extends MatchesModel{
  teamHome?: {
    teamName?: string
  },
  teamAway?: {
    teamName?: string
  }
}
export interface TeamTable {
  id: number,
  name: string,
  totalGames: number,
  totalPoints: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
