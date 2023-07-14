import { sign, verify } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'palavraqualquer';

type payloadJwt = {
  id: number;
  emails: string,
  role: string
};

const tokenGenerate = (payload: payloadJwt) => sign(payload, jwtSecret);

const verifyToken = (token: string) => verify(token, jwtSecret);

export { tokenGenerate, verifyToken };
