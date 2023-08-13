import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser, IUserChallenge } from './user.interface';

const userAuth = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.userAuth(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User authentication successful',
    data: result,
  });
});

const checkAdmin = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await UserService.checkAdmin(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Check admin done',
    data: result,
  });
});

const saveUserChallenge = catchAsync(async (req: Request, res: Response) => {
  const {...challengeData} = req.body;
  const userId = req?.user?._id

  const result = await UserService.addUserChallenge(challengeData, userId)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Challenges retrieved successfully',
    data: result,
  })
})

const getAllUserChallenges = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id
  const result = await UserService.getUserChallenges(userId);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Challenges retrieved successfully',
    data: result,
  })
})

const getChallengeById = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id
  const challengeId = req.params.id
  const result = await UserService.getUserChallengeById(userId, challengeId);
  sendResponse<IUserChallenge>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Challenges retrieved successfully',
    data: result,
  })
})

const deleteChallengeById = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id
  const userChallengeId = req.params.id
  const result = await UserService.deleteChallengeById(userId, userChallengeId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Challenges deleted successfully',
    data: result,
  })
})

export const UserController = {
  userAuth,
  checkAdmin,
  saveUserChallenge,
  getAllUserChallenges,
  getChallengeById,
  deleteChallengeById
};
