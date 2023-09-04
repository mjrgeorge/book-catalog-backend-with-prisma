import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
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

export const AuthService = {
  signupUser,
};
