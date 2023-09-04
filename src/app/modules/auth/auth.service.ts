import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { hashPasswordHook } from './auth.utils';

const signupUser = async (payload: User): Promise<User> => {
  const { password, role, email, ...userData } = payload;

  const ifUserExists = await prisma.user.findUnique({
    where: { email },
  });

  if (ifUserExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
  }

  const hashedPassword = await hashPasswordHook(password);

  const createdUser = await prisma.user.create({
    data: { password: hashedPassword, email, role, ...userData },
  });

  return createdUser;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  signupUser,
  loginUser,
};
