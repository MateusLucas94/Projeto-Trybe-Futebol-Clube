import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';
import { Login } from '../interfaces/index';

const secret = process.env.JWT_SECRET as string;
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
} as jwt.SignOptions;

export const validateLoginService = async ({ email, password }:Login):Promise<boolean> => {
  const response = await UserModel.findOne({
    where: {
      email,
    },
  });
  if (!response) {
    return false;
  }
  const validation = bcrypt.compareSync(password, response.password);
  return validation;
};

export const postLoginService = ({ email, password }:Login):string => {
  const token = jwt.sign({ email, password }, secret, jwtConfig);

  return token;
};

export const getUserByToken = async (token: string) => {
  const { email } = jwt.verify(token as string, secret) as Login;
  const response = await UserModel.findOne({
    where: {
      email,
    },
  });

  return response;
};
