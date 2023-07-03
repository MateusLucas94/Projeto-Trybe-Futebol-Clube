import { Request, Response } from 'express';
import { getAllTeamsService, getTeambyIdService } from '../services/TeamsService';

export const getAllTeams = async (_req: Request, res: Response) => {
  const response = await getAllTeamsService();

  return res.status(200).json(response);
};

export const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const response = await getTeambyIdService(Number(id));

  return res.status(200).json(response);
};
