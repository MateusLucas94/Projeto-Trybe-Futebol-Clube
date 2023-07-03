import { Op } from 'sequelize';
import TeamsModel from '../database/models/TeamsModel';

export const getAllTeamsService = async (): Promise<TeamsModel[]> => {
  const response = await TeamsModel.findAll();

  return response;
};

export const getTeambyIdService = async (id: number): Promise<TeamsModel> => {
  const response = await TeamsModel.findOne({
    where: {
      id,
    },
  });

  return response as TeamsModel;
};

export const getMatchTeams = async (homeTeam: number, awayTeam: number) => {
  const response = await TeamsModel.findAll({
    where: {
      [Op.or]: [
        { id: homeTeam },
        { id: awayTeam },
      ],
    },
  });
  return response;
};
