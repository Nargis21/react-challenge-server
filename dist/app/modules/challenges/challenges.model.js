"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Challenge = void 0;
const mongoose_1 = require("mongoose");
const ChallengeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true
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
}, {
    timestamps: true,
});
exports.Challenge = (0, mongoose_1.model)('Challenge', ChallengeSchema);
