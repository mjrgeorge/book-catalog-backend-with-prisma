import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';

const getAllBooks = catchAsync(async (req, res) => {
  const book = await BookService.getAllBooks(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully!',
    data: book,
  });
});

const createBook = catchAsync(async (req, res) => {
  const book = await BookService.createBook(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully!',
    data: book,
  });
});
export const BookController = {
  getAllBooks,
  createBook,
};
