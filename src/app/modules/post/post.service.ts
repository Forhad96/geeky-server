import mongoose from 'mongoose';
import { IPost } from './post.interface';
import { Post } from './post.model';
import { User } from '../User/user.model';

const createPost = (payload: Partial<IPost>, userId: string) => {
  payload.author = new mongoose.Types.ObjectId(userId);
  const result = Post.create(payload);
  return result;
};

const getAllPost = async (
  userId: string | undefined,
  query: Record<string, undefined>
) => {
  const user = await User.findById(userId);
  let posts;
  if (user && user.isPremiumUser) {
    posts = await Post.find(query);
  } else {
    posts = await Post.find({ isPremium: false, ...query });
  }

  return posts;
};

export const PostServices = {
  createPost,
  getAllPost,
};
