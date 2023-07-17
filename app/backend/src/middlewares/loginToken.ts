import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/JWT';

class loginRole {
  constructor(
    private verify = verifyToken,
  ) { }

  public async validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenBearer = authorization.split(' ');
    try {
      this.verify(tokenBearer[1]);
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  public async role(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (authorization) {
      const tokenBearer = authorization.split(' ');
      const token = this.verify(tokenBearer[1]);
      if (typeof token === 'object' && 'role' in token) {
        return res.status(200).json({ role: token.role });
      }
    }
  }
}

export default loginRole;
