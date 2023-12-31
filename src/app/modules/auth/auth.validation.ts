import { z } from 'zod';

const signupZodSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
    email: z.string().email({
      message: 'Email is required',
    }),
    password: z.string().min(4, { message: 'Password is too short' }),
    role: z.enum(['admin', 'customer'], {
      required_error: 'Role is required',
    }),
    contactNo: z.string().min(9, { message: 'Contact number is required' }),
    address: z.string({
      required_error: 'Address is required',
    }),
    profileImg: z.string().optional(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string().email({
      message: 'Invalid email',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const AuthValidation = {
  signupZodSchema,
  loginZodSchema,
};
