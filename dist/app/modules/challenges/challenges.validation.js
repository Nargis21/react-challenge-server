"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeValidation = void 0;
const zod_1 = require("zod");
//req validation with zod
const createChallengeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().nonempty('Title is required'),
        challengeCategory: zod_1.z.string().nonempty('Category is required'),
        description: zod_1.z.string().nonempty('Description is required'),
        files: zod_1.z.string().nonempty('Files data is required'),
        difficultyLevel: zod_1.z.string().nonempty('Challenge Level is required'),
    }),
});
exports.ChallengeValidation = {
    createChallengeZodSchema
};
