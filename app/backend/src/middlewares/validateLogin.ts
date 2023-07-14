import { NextFunction, Request, Response } from 'express';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
// import validateToken from '../utils/validateToken';

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  const responseToken = compareSync(password, hash);
  console.log(hash);

  if (email && password) {
    return res.status(200).json({ email, password, responseToken });
  }
  next();
};

export default login;
