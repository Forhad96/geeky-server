import { z } from 'zod';
import { USER_ROLE, USER_STATUS } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    username: z.string({ required_error: 'UserName is required' }).optional(),
    role: z.nativeEnum(USER_ROLE),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
    status: z.nativeEnum(USER_STATUS).default(USER_STATUS.ACTIVE),
    mobileNumber: z.string().optional(),
    bio: z.string().optional(),
    isVerified: z.boolean().default(false),
    isPremiumUser: z.boolean().default(false),
    followers: z.array(z.string()).default([]),
    following: z.array(z.string()).default([]),
    posts: z.array(z.string()).default([]),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.nativeEnum(USER_ROLE).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    status: z.nativeEnum(USER_STATUS).optional(),
    mobileNumber: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
