import { Request, Response } from 'express';
import UserModel from '../database/models/UserModel';
import { postLoginService, getUserByToken } from '../services/UserService';

export const postLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const responseToken = await postLoginService({ email, password });
  return res.status(200).json({ token: responseToken });
};

export const getuserRole = async (req: Request, res: Response) => {
  const { authorization: token } = req.headers;

  const response = await getUserByToken(token as string) as UserModel;

  return res.status(200).json({ role: response.role });
};

export default postLoginController;
