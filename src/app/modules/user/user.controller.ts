import { Request, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

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

export const UserController = {
  userAuth,
  checkAdmin,
};
