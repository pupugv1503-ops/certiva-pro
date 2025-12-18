import jwt from 'jsonwebtoken';

export type JwtPayload = {
  sub: string;
  email: string;
};

export const signToken = (payload: JwtPayload) => {
  const secret = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
  return jwt.verify(token, secret) as JwtPayload;
};
