import { Model } from 'mongoose';

export type IChallenge = {
  title: string;
  category: string;
  difficulty: string;
  description: string;
  files: string;
};

export type ChallengeModel = Model<IChallenge, Record<string, unknown>>;
