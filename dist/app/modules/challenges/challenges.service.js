"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const challenges_model_1 = require("./challenges.model");
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const getAllChallenges = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield challenges_model_1.Challenge.find().select('-files');
    return result;
});
const createChallenge = (challenge) => __awaiter(void 0, void 0, void 0, function* () {
    const createdChallenge = challenges_model_1.Challenge.create(challenge);
    if (!createdChallenge) {
        throw new ApiError_1.default(400, 'Failed to create challenge!');
    }
    return createdChallenge;
});
const getChallengeById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!(userId === undefined || userId === null)) {
        const result = yield user_model_1.User.findById(userId);
        const challenge = (_a = result === null || result === void 0 ? void 0 : result.challenges) === null || _a === void 0 ? void 0 : _a.find(challenge => {
            if ((challenge === null || challenge === void 0 ? void 0 : challenge.challengeId) === id) {
                return challenge;
            }
        });
        if (challenge) {
            return challenge;
        }
        else {
            const result = yield challenges_model_1.Challenge.findById(id);
            return result;
        }
    }
    else {
        const result = yield challenges_model_1.Challenge.findById(id);
        return result;
    }
});
const deleteChallenge = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const challenge = yield challenges_model_1.Challenge.findById(id);
    if (!challenge) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Challenge does not exist');
    }
    const result = yield challenges_model_1.Challenge.findByIdAndDelete(id);
    return result;
});
const updateChallenge = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const challenge = yield challenges_model_1.Challenge.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
    if (!challenge) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Challenge Not Updated');
    }
    return challenge;
});
exports.ChallengeService = {
    getAllChallenges,
    createChallenge,
    getChallengeById,
    deleteChallenge,
    updateChallenge
};
