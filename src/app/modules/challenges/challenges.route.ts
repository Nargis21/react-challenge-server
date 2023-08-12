import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ChallengeValidation } from './challenges.validation'
import { ChallengeController } from './challenges.controller'
import auth, {userOrNull} from '../../middlewares/auth'

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(ChallengeValidation.createChallengeZodSchema),
  ChallengeController.createChallenge
);

router.get('/', ChallengeController.getAllChallenges);
router.get('/:id', userOrNull(), ChallengeController.getChallengeById);

router.delete('/:id', auth(), ChallengeController.deleteChallenge);

export const ChallengeRoutes = router;
