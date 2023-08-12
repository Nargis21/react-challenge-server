import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ChallengeService } from './challenges.service';
import { Request, Response } from 'express';
import { IChallenge } from './challenges.interface';

const createChallenge = catchAsync(async (req: Request, res: Response) => {
  const {...challengeData} = req.body
  const result = await ChallengeService.createChallenge(challengeData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Challenge created successfully',
    data: result,
  })
})

const getAllChallenges = catchAsync(async (req: Request, res: Response) => {
  const result = await ChallengeService.getAllChallenges();
  sendResponse<IChallenge[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Challenges retrieved successfully',
    data: result,
  })
})

const getChallengeById = catchAsync(async (req: Request, res: Response) => {
  const challengeId = req.params.id
  const result = await ChallengeService.getChallengeById(challengeId);
  sendResponse<IChallenge | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Challenge retrieved successfully',
    data: result,
  })
})

const deleteChallenge = catchAsync(async (req: Request, res: Response) => {
  const challengeId = req.params.id
  const result = await ChallengeService.deleteChallenge(challengeId);
  sendResponse<IChallenge | null>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Challenge deleted successfully',
    data: result,
  })
})

export const ChallengeController = {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  deleteChallenge
}
