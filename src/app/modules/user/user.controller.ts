import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: users,
    message: 'Users retrieved successfully!',
  });
});

const updateUser = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const user = await UserService.updateUser(id, body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: user,
    message: 'User updated successfully!',
  });
});

export const UserController = {
  getAllUsers,
  updateUser,
};
