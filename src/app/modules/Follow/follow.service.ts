// import httpStatus from 'http-status';
import { FollowModel } from './follow.model';
// import AppError from '../../errors/AppError';
import { IFollow } from './follow.interface';
import { User } from '../User/user.model';
import { USER_ROLE } from '../User/user.constant';

// Create a follow relationship (with duplicate check)
const createFollow = async (
  followerId: string,
  followingId: string
): Promise<IFollow | null> => {
  // Check if the follow relationship already exists
  const existingFollow = await FollowModel.findOne({
    follower: followerId,
    following: followingId,
  });

  if (existingFollow) {
    throw new Error('You are already following this user.');
  }

  // If not already following, create a new follow relationship
  const follow = new FollowModel({
    follower: followerId,
    following: followingId,
  });
  return await follow.save();
};

const getAvailableUsersToFollow = async (userId: string) => {
  try {
    // Fetch all users
    const allUsers = await User.find({ _id: { $ne: userId,  },role:{$ne: USER_ROLE.ADMIN} }); // Exclude the current user

    // Fetch the list of users the current user is following
    const following = await FollowModel.find({ follower: userId }).select(
      'following'
    );

    // Extract the IDs of the users being followed
    const followingIds = following.map((follow) => follow.following.toString());

    // Filter out the users that are already being followed
    const availableUsersToFollow = allUsers.filter(
      (user) => !followingIds.includes(user._id.toString())
    );

    return availableUsersToFollow;
  } catch (error) {
    console.error('Error fetching available users to follow:', error);
    throw error;
  }
};

// Get followers of a user
const getFollowers = async (userId: string): Promise<IFollow[]> => {
  return await FollowModel.find({ following: userId })
    .populate('follower')
    .exec();
};

// Get users this user is following
const getFollowing = async (userId: string): Promise<IFollow[]> => {
  return await FollowModel.find({ follower: userId })
    .populate('following')
    .exec();
};

const countFollowersAndFollowing = async(userId: string) => {
  const followersCount =await FollowModel.countDocuments({ following: userId });
  const followingCount =await FollowModel.countDocuments({ follower: userId });
console.log(followersCount);
  return {
    followers: followersCount,
    following: followingCount,
  };
};

// Delete a follow relationship (unfollow)
const deleteFollow = async (
  followerId: string,
  followingId: string
): Promise<IFollow | null> => {
  return await FollowModel.findOneAndDelete({
    follower: followerId,
    following: followingId,
  });
};

export const FollowServices = {
  createFollow,
  deleteFollow,
  getFollowers,
  getFollowing,
  getAvailableUsersToFollow,
  countFollowersAndFollowing,
};
