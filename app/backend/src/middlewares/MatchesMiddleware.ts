import { NextFunction, Request, Response } from 'express';
import { getMatchTeams } from '../services/TeamsService';

export const validateMatchesFields = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(422).json(
      {
        message: 'It is not possible to create a match with two equal teams' },
    );
  }
  next();
};

export const validateMatchesTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const response = await getMatchTeams(homeTeam, awayTeam);
  if (response.length !== 2) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default validateMatchesFields;
