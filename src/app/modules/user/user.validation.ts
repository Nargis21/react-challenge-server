import { z } from 'zod';

//req validation with zod
const UserAuthZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
  }),
});

const UserChallengeZodSchema = z.object({
  body: z.object({
    challengeId: z.string().nonempty('challengeId is required'),
    title: z.string().nonempty('Title is required'),
    challengeCategory: z.string().nonempty('Category is required'),
    description: z.string().nonempty('Description is required'),
    files: z.string().nonempty('Files data is required'),
    difficultyLevel: z.string().nonempty('Challenge Level is required'),
  })
})

export const UserValidation = {
  UserAuthZodSchema,
  UserChallengeZodSchema
};
