import { Book, Prisma } from '@prisma/client';
import { Request } from 'express';
import prisma from '../../../shared/prisma';
import { bookSearchableFields } from './book.constants';

const createBook = async (payload: Book): Promise<Book> => {
  const book = await prisma.book.create({
    data: payload,
  });
  return book;
};

type IBooksWithMeta = {
  data: Book[];
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
};

const getAllBooks = async (req: Request): Promise<IBooksWithMeta> => {
  const reqUrl = `https://example.com` + req.url.split('/')[1];
  const url = new URL(reqUrl);
  const queries = url.searchParams;

  // Pagination
  const page = Number(queries.get('page')) || 1;
  const take = Number(queries.get('size')) || 10;
  const skip = (page - 1) * take;

  // Sorting
  const sortBy = queries.get('sortBy') || 'publicationDate';
  const sortOrder = queries.get('sortOrder') || 'desc';

  // Searching and Filtering
  const conditions = [];

  // Searching
  const searchTerm = queries.get('search');
  if (searchTerm) {
    conditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Filtering
  const category = queries.get('category');
  if (category) {
    conditions.push({
      categoryId: category,
    });
  }

  // Price Filtering
  const minPrice = queries.get('minPrice');
  const maxPrice = queries.get('maxPrice');

  const minPriceNumValue = minPrice && Number(minPrice);
  const maxPriceNumValue = maxPrice && Number(maxPrice);
  if (minPriceNumValue) {
    conditions.push({
      price: {
        gte: minPriceNumValue,
      },
    });
  }
  if (maxPriceNumValue) {
    conditions.push({
      price: {
        lte: maxPriceNumValue,
      },
    });
  }

  const where: Prisma.BookWhereInput =
    conditions.length > 0 ? { AND: conditions } : {};

  const books = await prisma.book.findMany({
    include: {
      category: true,
      reviewAndRatings: true,
    },
    skip,
    take,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where,
  });

  const total = await prisma.book.count();

  return {
    data: books,
    meta: {
      page,
      size: take,
      total,
      totalPage: Math.ceil(total / take),
    },
  };
};

export const BookService = {
  createBook,
  getAllBooks,
};