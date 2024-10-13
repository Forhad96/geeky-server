import mongoose from 'mongoose';
import { IPost } from './post.interface';
import { Post } from './post.model';
import { User } from '../User/user.model';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { PostSearchableFields } from './post.constant';

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
    const queryPost = new QueryBuilder(Post.find(), query)
      .fields()
      .paginate()
      .sort()
      .filter()
    .search(PostSearchableFields);

    posts = await queryPost.modelQuery;
    // posts = await Post.find(query).populate('author');
  } else {
    const queryPost = new QueryBuilder(Post.find({ isPremium: false }), query)
      .fields()
      .paginate()
      .sort()
      .filter()
    .search(PostSearchableFields);

    posts = await queryPost.modelQuery;
    // posts = await Post.find({ isPremium: false, ...query }).populate('author');
  }

  return posts;
};

export const PostServices = {
  createPost,
  getAllPost,
};
