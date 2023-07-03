import { NextFunction, Request, Response } from 'express';
import { validateLoginService, getUserByToken } from '../services/UserService';

export const validateLoginFields = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export const validateLoginInfo = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const response = await validateLoginService({ email, password });
  if (!response) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  try {
    const response = await getUserByToken(token as string);
    if (!response) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};
