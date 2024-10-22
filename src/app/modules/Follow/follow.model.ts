
import { IFollow } from './follow.interface';
import { model, Schema, } from 'mongoose';

const followSchema = new Schema<IFollow>({
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const FollowModel = model<IFollow>('Follow', followSchema);
