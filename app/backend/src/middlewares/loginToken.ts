import { Request, Response } from 'express';
import { verifyToken } from '../utils/JWT';

class loginRole {
  constructor(
    private verify = verifyToken,
  ) { }

  public async validatePassword(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ message: 'Token not found' });
    } else {
      const tokenBearer = authorization.split(' ');
      try {
        const token = this.verify(tokenBearer[1]);
        if (typeof token === 'object' && 'role' in token) {
          res.status(200).json({ role: token.role });
        }
      } catch (err) {
        res.status(401).json({ message: 'Token must be a valid token' });
      }
    }
  }
}

export default loginRole;
