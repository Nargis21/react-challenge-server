import { z } from 'zod';

//req validation with zod
const createChallengeZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    challengeCategory: z.string().nonempty('Category is required'),
    description: z.string().nonempty('Description is required'),
    files: z.string().nonempty('Files data is required'),
    difficultyLevel: z.string().nonempty('Challenge Level is required'),
  }),
});

export const ChallengeValidation = {
  createChallengeZodSchema
}