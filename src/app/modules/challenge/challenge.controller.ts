import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ChallengeService } from './challenge.service';
import { Request, Response } from 'express';
import { IChallenge } from './challenge.interface';

const createChallenge = catchAsync(async (req: Request, res: Response) => {
  const { ...challengeData } = req.body;
  const result = await ChallengeService.createChallenge(challengeData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Challenge created successfully',
    data: result,
  });
});

const getAllChallenges = catchAsync(async (req: Request, res: Response) => {
  const result = await ChallengeService.getAllChallenges();
  sendResponse<IChallenge[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenges retrieved successfully',
    data: result,
  });
});

const getTopTen = catchAsync(async (req: Request, res: Response) => {
  const result = await ChallengeService.getTopTen();
  sendResponse<IChallenge[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenges retrieved successfully',
    data: result,
  });
});

const getSingleChallenge = catchAsync(async (req: Request, res: Response) => {
  const challengeId = req.params.id;
  const result = await ChallengeService.getSingleChallenge(challengeId);
  sendResponse<IChallenge | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenge retrieved successfully',
    data: result,
  });
});

const updateChallenge = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  const challengeId = req.params.id;
  const updatedData = req.body;
  const result = await ChallengeService.updateChallenge(
    userEmail,
    challengeId,
    updatedData
  );
  sendResponse<IChallenge>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenge updated successfully',
    data: result,
  });
});

const deleteChallenge = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user?.email;
  const challengeId = req.params.id;
  const result = await ChallengeService.deleteChallenge(userEmail, challengeId);
  sendResponse<IChallenge | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Challenge deleted successfully',
    data: result,
  });
});

export const ChallengeController = {
  createChallenge,
  getAllChallenges,
  getTopTen,
  getSingleChallenge,
  updateChallenge,
  deleteChallenge,
};
