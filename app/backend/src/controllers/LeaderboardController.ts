import { Request, Response } from 'express';
import {
  generateOrderedLeaderboard,
  generateOrderedLeaderboardAway,
  generateOrderedLeaderboardHome,
} from '../services/LeaderboardService';

export const leaderboardHome = async (_req: Request, res: Response) => {
  const response = await generateOrderedLeaderboardHome();
  return res.status(200).json(response);
};

export const leaderboardAway = async (_req: Request, res: Response) => {
  const response = await generateOrderedLeaderboardAway();
  return res.status(200).json(response);
};

export const leaderboard = async (_req: Request, res: Response) => {
  const response = await generateOrderedLeaderboard();
  return res.status(200).json(response);
};
