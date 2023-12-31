import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

export const userOrNull =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (token === 'Bearer null' || token === null || token === undefined) {
        req.user = null;
      } else {
        //verify token
        const verifiedUser = jwtHelpers.verifyToken(
          token,
          config.jwt.secret as Secret
        );
        req.user = verifiedUser;

        //protect by role
        if (
          requiredRoles.length &&
          !requiredRoles.includes(verifiedUser.role)
        ) {
          throw new ApiError(httpStatus.FORBIDDEN, 'You are not permitted');
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      //verify token
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.secret as Secret
      );
      req.user = verifiedUser;

      //protect by role
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not permitted');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
