import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = Router();

router.get(
  '/',
  validateRequest(UserValidation.getAllUsersZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers
);

router
  .route('/:id')
  .get(
    validateRequest(UserValidation.getOrDeleteUserZodSchema),
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
    UserController.getUserById
  )
  .patch(
    validateRequest(UserValidation.getOrDeleteUserZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    UserController.updateUser
  )
  .delete(
    validateRequest(UserValidation.getOrDeleteUserZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    UserController.deleteUser
  );

export const UserRoutes = router;
