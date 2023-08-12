import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ChallengeValidation } from './challenge.validation';
import { ChallengeController } from './challenge.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequest(ChallengeValidation.createChallengeZodSchema),
  ChallengeController.createChallenge
);

router.get('/', ChallengeController.getAllChallenges);
router.get('/get-top-ten', ChallengeController.getTopTen);
router.get('/:id', ChallengeController.getSingleChallenge);

router.patch(
  '/:id',
  auth(),
  validateRequest(ChallengeValidation.updateChallengeZodSchema),
  ChallengeController.updateChallenge
);

router.delete('/:id', auth(), ChallengeController.deleteChallenge);

export const ChallengeRoutes = router;
