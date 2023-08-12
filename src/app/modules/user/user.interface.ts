/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export type IUser = Document & {
  email: string;
  role: 'user' | 'admin';
  challenges: Array<object>;
};

export type IUserResponse = {
  responseUser: IUser;
  accessToken: string;
  refreshToken?: string;
};

//statics
export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'email' | 'role'> | null>;
} & Model<IUser>;
