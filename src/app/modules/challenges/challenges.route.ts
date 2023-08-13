import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ChallengeValidation } from './challenges.validation'
import { ChallengeController } from './challenges.controller'
import auth, {userOrNull} from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/users'

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ChallengeValidation.createChallengeZodSchema),
  ChallengeController.createChallenge
);

router.get('/', ChallengeController.getAllChallenges);
router.get('/:id', userOrNull(), ChallengeController.getChallengeById);

router.put('/:id', auth(ENUM_USER_ROLE.ADMIN), ChallengeController.updateChallengeById)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), ChallengeController.deleteChallenge);

export const ChallengeRoutes = router;
