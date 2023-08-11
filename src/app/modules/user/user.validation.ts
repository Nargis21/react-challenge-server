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

export const UserValidation = {
  UserAuthZodSchema,
};
