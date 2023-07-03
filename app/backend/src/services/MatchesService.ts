import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { Matches } from '../interfaces/index';

export const getAllMatchesService = async (): Promise<Matches[]> => {
  const response = await MatchesModel.findAll({
    include: [
      {
        model: TeamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
  });

  return response;
};

export const getAllMatchesByProgress = async (inProgress: boolean): Promise<Matches[]> => {
  const response = await MatchesModel.findAll({
    include: [
      {
        model: TeamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    where: {
      inProgress,
    },
  });

  return response;
};

export const createNewMatchService = async (matchInfo: Matches) => {
  const match = { ...matchInfo, inProgress: true };
  const response = await MatchesModel.create(match);
  return response;
};
export const finishMatchService = async (id: string) => {
  const response = await MatchesModel.update(
    {
      inProgress: 0,
    },
    {
      where: {
        id,
      },
    },
  );
  return response;
};

export const updateMatchService = async (matchInfo: Matches, id: string) => {
  const { homeTeamGoals, awayTeamGoals } = matchInfo;
  if ((homeTeamGoals && awayTeamGoals) !== undefined) {
    await MatchesModel.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: {
          id,
        },
      },
    );
  }
};

export default getAllMatchesService;
