import { Model } from 'mongoose';

export type IChallenge = {
  title: string;
  challengeCategory: string,
  description: string,
  files: string,
  difficultyLevel: string
};

export type ChallengeModel = Model<IChallenge, Record<string, unknown>>;