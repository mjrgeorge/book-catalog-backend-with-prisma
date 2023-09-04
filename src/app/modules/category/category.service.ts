import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCategory = async (payload: Category): Promise<Category> => {
  const category = await prisma.category.create({
    data: payload,
  });
  return category;
};

const getAllCategories = async (): Promise<Category[]> => {
  const categories = await prisma.category.findMany({
    include: {
      books: true,
    },
  });
  return categories;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
};
