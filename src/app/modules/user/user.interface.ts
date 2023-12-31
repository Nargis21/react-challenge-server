/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export type IUserChallenge = {
  challengeId: string,
  title: string,
  challengeCategory: string,
  files: string,
  description: string,
  difficultyLevel: string,
}

export type IUser = Document & {
  email: string;
  role: 'user' | 'admin';
  challenges: IUserChallenge[]
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
