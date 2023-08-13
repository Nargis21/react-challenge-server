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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    challenges: [{
            challengeId: { type: String, required: true },
            title: { type: String, required: true },
            challengeCategory: { type: String, required: true },
            files: { type: String, required: true },
            description: { type: String, required: true },
            difficultyLevel: { type: String, required: true },
        }]
}, {
    timestamps: true,
});
UserSchema.statics.isUserExist = function (params) {
    return __awaiter(this, void 0, void 0, function* () {
        let query;
        if (mongoose_1.Types.ObjectId.isValid(params)) {
            query = { _id: new mongoose_1.Types.ObjectId(params) };
        }
        else {
            query = { email: params };
        }
        return yield exports.User.findOne(query, { _id: 1, email: 1, role: 1 });
    });
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
