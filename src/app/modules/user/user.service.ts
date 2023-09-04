import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const getAllUsers = async (): Promise<Array<User>> => {
  const users = await prisma.user.findMany();
  return users;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updatedUser = prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedUser;
};

export const UserService = {
  getAllUsers,
  updateUser,
};
