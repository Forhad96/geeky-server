import { z } from 'zod';

export const createPostValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    tags: z.array(z.string()).nonempty('tags are required'),
    category: z.string().min(1, 'Category is required'),
  }),
});


// Define the Zod schema for the Post document
const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string()).optional(),
  category: z.string().min(1, 'Category is required'),
  author: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'), // Assuming author is an ObjectId
  upVotes: z.number().int().nonnegative().default(0),
  downVotes: z.number().int().nonnegative().default(0),
  isPremium: z.boolean().default(false),
  views: z.number().int().nonnegative().default(0),
  pdfVersion: z.string().optional(),
  isDeleted: z.boolean().default(false),
  comments: z.number().int().nonnegative().default(0),
});

// Example usage
const postData = {
  title: 'Sample Post',
  content: 'This is a sample post content.',
  category: 'General',
  author: '507f1f77bcf86cd799439011', // Example ObjectId
};

const parsedData = postSchema.parse(postData);
// console.log(parsedData);


export const updatePostValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    author: z.string().optional(),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
