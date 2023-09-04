import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUsers = async (): Promise<Array<User>> => {
  const users = await prisma.user.findMany();
  return users;
};

export const UserService = {
  getAllUsers,
};
