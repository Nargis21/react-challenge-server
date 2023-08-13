"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
//req validation with zod
const UserAuthZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email(),
    }),
});
const UserChallengeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        challengeId: zod_1.z.string().nonempty('challengeId is required'),
        title: zod_1.z.string().nonempty('Title is required'),
        challengeCategory: zod_1.z.string().nonempty('Category is required'),
        description: zod_1.z.string().nonempty('Description is required'),
        files: zod_1.z.string().nonempty('Files data is required'),
        difficultyLevel: zod_1.z.string().nonempty('Challenge Level is required'),
    })
});
exports.UserValidation = {
    UserAuthZodSchema,
    UserChallengeZodSchema
};
