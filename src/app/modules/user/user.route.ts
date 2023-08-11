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

export const UserRoutes = router;
