import { Request, Response } from 'express';
import {
  createNewMatchService,
  finishMatchService,
  getAllMatchesByProgress,
  getAllMatchesService,
  updateMatchService,
} from '../services/MatchesService';

export const getAllMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress) {
    const progress = inProgress === 'true' ? 1 : 0;
    const response = await getAllMatchesByProgress(Boolean(progress));
    return res.status(200).json(response);
  }
  const response = await getAllMatchesService();
  return res.status(200).json(response);
};

export const createNewMatch = async (req: Request, res: Response) => {
  const response = await createNewMatchService(req.body);
  return res.status(201).json(response);
};

export const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await finishMatchService(id);
  return res.status(200).json({ message: 'Finished' });
};

export const updateMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await updateMatchService(req.body, id);
  return res.status(200).json('ok!');
};

export default getAllMatches;
