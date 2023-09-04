import { z } from 'zod';

const createBookZodSchema = z.object({
  headers: z.object({
    authorization: z.string().nonempty({
      message: 'Authorization is required',
    }),
  }),
  body: z.object({
    title: z.string().nonempty({
      message: 'Title is required',
    }),
    author: z.string().nonempty({
      message: 'Author is required',
    }),
    price: z.number({ required_error: 'Price is required' }),
    publicationDate: z.string({
      required_error: 'Publication date is required',
    }),
    categoryId: z.string().nonempty({
      message: 'Category Id is required',
    }),
  }),
});

export const BookValidation = {
  createBookZodSchema,
};
