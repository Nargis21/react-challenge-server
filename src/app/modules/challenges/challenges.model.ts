import { Schema, model } from 'mongoose';
import { ChallengeModel, IChallenge } from './challenges.interface';

const ChallengeSchema = new Schema<IChallenge>(
  {
    title: {
      type: String,
      required: true,
    },
    challengeCategory: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    files: {
      type: String,
      required: true,
    },
    difficultyLevel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Challenge = model<IChallenge, ChallengeModel>('Challenge', ChallengeSchema);