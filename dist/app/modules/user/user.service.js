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
exports.UserService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../../config"));
const userAuth = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let userInfo;
    const isUserExist = yield user_model_1.User.isUserExist(user.email);
    if (!isUserExist) {
        const createdUser = yield user_model_1.User.create(user);
        if (!createdUser) {
            throw new ApiError_1.default(400, 'Failed to create user!');
        }
        const { _id, email, role } = createdUser;
        userInfo = { _id, email, role };
    }
    else {
        const { _id, email, role } = isUserExist;
        userInfo = { _id, email, role };
    }
    //create access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(userInfo, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
const checkAdmin = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExist(email);
    const isAdmin = (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role) === 'admin';
    return { admin: isAdmin };
});
const getUserChallenges = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(userId);
    return result;
});
const getUserChallengeById = (userId, challengeId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield user_model_1.User.findById(userId);
    const challenge = (_a = result === null || result === void 0 ? void 0 : result.challenges) === null || _a === void 0 ? void 0 : _a.find(challenge => {
        if ((challenge === null || challenge === void 0 ? void 0 : challenge.challengeId) === challengeId) {
            return challenge;
        }
    });
    return challenge;
});
const deleteChallengeById = (userId, userChallengeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ _id: userId }, {
        $pull: {
            challenges: { challengeId: userChallengeId },
        },
    }, { safe: true });
    return result;
});
const addUserChallenge = (challengeData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // find the user
    const result = yield user_model_1.User.findById(userId);
    // check if challenge exist
    const challengeId = challengeData === null || challengeData === void 0 ? void 0 : challengeData.challengeId;
    const challenge = (_b = result === null || result === void 0 ? void 0 : result.challenges) === null || _b === void 0 ? void 0 : _b.find(challenge => {
        if ((challenge === null || challenge === void 0 ? void 0 : challenge.challengeId) === challengeId) {
            return challenge;
        }
    });
    if (challenge) {
        // update the files
        const updateChallenge = yield user_model_1.User.findByIdAndUpdate({ _id: userId }, {
            $set: {
                'challenges.$[item].files': challengeData === null || challengeData === void 0 ? void 0 : challengeData.files,
            },
        }, {
            arrayFilters: [{ 'item.challengeId': challengeId }],
        });
        if (!updateChallenge) {
            throw new ApiError_1.default(400, 'Failed to create challenge!');
        }
        return updateChallenge;
    }
    else {
        // add new challenge into challenges
        const addChallenge = yield user_model_1.User.findByIdAndUpdate({ _id: userId }, {
            $addToSet: {
                challenges: challengeData,
            },
        });
        if (!addChallenge) {
            throw new ApiError_1.default(400, 'Failed to create challenge!');
        }
        return addChallenge;
    }
});
exports.UserService = {
    userAuth,
    checkAdmin,
    addUserChallenge,
    getUserChallenges,
    getUserChallengeById,
    deleteChallengeById,
};
