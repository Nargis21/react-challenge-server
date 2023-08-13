import express from 'express';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

router.post(
  '/auth/:email',
  validateRequest(UserValidation.UserAuthZodSchema),
  UserController.userAuth
);
router.get(
  '/admin/:email',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.checkAdmin
);

router.get(
  '/challenge',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUserChallenges
);

router.post(
  '/challenge',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.UserChallengeZodSchema),
  UserController.saveUserChallenge
);

router.get(
  '/challenge/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.getChallengeById
);

router.delete(
  '/challenge/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.deleteChallengeById
);

export const UserRoutes = router;
