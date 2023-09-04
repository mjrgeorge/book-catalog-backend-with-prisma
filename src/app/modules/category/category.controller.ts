import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const category = await CategoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully!',
    data: category,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await CategoryService.getAllCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully!',
    data: categories,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const category = await CategoryService.getSingleCategory(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully!',
    data: category,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const updatedCategory = await CategoryService.updateCategory(id, body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully!',
    data: updatedCategory,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await CategoryService.deleteCategory(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully!',
    data: category,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
