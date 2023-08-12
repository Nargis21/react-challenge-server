import { z } from 'zod';

//req validation with zod
const createChallengeZodSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    category: z.string().nonempty('Category is required'),
    difficulty: z.string().nonempty('Difficulty is required'),
    description: z.string().nonempty('Description date is required'),
    files: z.string().nonempty('Files is required'),
  }),
});
const updateChallengeZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    difficulty: z.string().optional(),
    description: z.string().optional(),
    files: z.string().optional(),
  }),
});

export const ChallengeValidation = {
  createChallengeZodSchema,
  updateChallengeZodSchema,
};
