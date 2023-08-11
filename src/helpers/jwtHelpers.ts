import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: object,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: expireTime });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  const newToken = token.split(' ')[1];
  return jwt.verify(newToken, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
