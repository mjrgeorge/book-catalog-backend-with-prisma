import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = Router();

router.get('/', BookController.getAllBooks);

router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);

router.route('/:id').get(BookController.getSingleBook);

router.get('/:categoryId/category', BookController.getBookByCategory);

export const BookRoutes = router;
