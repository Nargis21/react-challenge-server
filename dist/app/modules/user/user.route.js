"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/auth/:email', (0, validateRequest_1.default)(user_validation_1.UserValidation.UserAuthZodSchema), user_controller_1.UserController.userAuth);
router.get('/admin/:email', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
user_controller_1.UserController.checkAdmin);
router.get('/challenge', (0, auth_1.default)(users_1.ENUM_USER_ROLE.USER, users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getAllUserChallenges);
router.post('/challenge', (0, auth_1.default)(users_1.ENUM_USER_ROLE.USER, users_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.UserChallengeZodSchema), user_controller_1.UserController.saveUserChallenge);
router.get('/challenge/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.USER, users_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getChallengeById);
router.delete('/challenge/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN, users_1.ENUM_USER_ROLE.USER), user_controller_1.UserController.deleteChallengeById);
exports.UserRoutes = router;
