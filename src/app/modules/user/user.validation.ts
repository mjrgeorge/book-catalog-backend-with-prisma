import { z } from 'zod';

const getAllUsersZodSchema = z.object({
  headers: z.object({
    authorization: z.string().nonempty({
      message: 'Authorization is required',
    }),
  }),
});

export const UserValidation = {
  getAllUsersZodSchema,
};
