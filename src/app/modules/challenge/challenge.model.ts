import { Schema, model } from 'mongoose';
import { ChallengeModel, IChallenge } from './challenge.interface';

const ChallengeSchema = new Schema<IChallenge>(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
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
  },
  {
    timestamps: true,
  }
);

export const Challenge = model<IChallenge, ChallengeModel>(
  'Challenge',
  ChallengeSchema
);
