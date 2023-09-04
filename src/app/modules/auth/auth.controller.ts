import { User } from '@prisma/client';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import { ILoginUserResponse } from './auth.interface';
import config from '../../../config';

const signupUser = catchAsync(async (req, res) => {
  const result = await AuthService.signupUser(req.body);

  sendResponse<User>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: others,
  });
});

export const AuthController = {
  signupUser,
  loginUser,
};
