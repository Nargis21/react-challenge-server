/* eslint-disable @typescript-eslint/no-explicit-any */
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config';

const userAuth = async (user: IUser) => {
  let userInfo;

  const isUserExist = await User.isUserExist(user.email);
  if (!isUserExist) {
    const createdUser = await User.create(user);
    if (!createdUser) {
      throw new ApiError(400, 'Failed to create user!');
    }
    const { _id, email, role } = createdUser;
    userInfo = { _id, email, role };
  } else {
    const { _id, email, role } = isUserExist;
    userInfo = { _id, email, role };
  }

  //create access token
  const accessToken = jwtHelpers.createToken(
    userInfo,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken };
};

const checkAdmin = async (email: string) => {
  const isUserExist = await User.isUserExist(email);
  const isAdmin = isUserExist?.role === 'admin';
  return { admin: isAdmin };
};

export const UserService = {
  userAuth,
  checkAdmin,
};
