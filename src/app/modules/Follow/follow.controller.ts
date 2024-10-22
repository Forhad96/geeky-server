import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FollowServices } from './follow.service';

// Follow a user
const handleFollow = catchAsync(async (req, res) => {
  const { followerId, followingId } = req.body;

  // Create a follow relationship
  const result = await FollowServices.createFollow(followerId, followingId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: `You have successfully followed the user.`,
    data: result,
  });
});

// Unfollow a user
const handleUnFollow = catchAsync(async (req, res) => {
  const { followerId, followingId } = req.body;

  const result = await FollowServices.deleteFollow(followerId, followingId);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: `The follow relationship does not exist.`,
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `You have successfully unfollowed the user.`,
    data: result,
  });
});

// Get followers of a user
const handleGetFollowers = catchAsync(async (req, res) => {
  // const { userId } = req.params;
  const { _id: userId } = req.user;
  const followers = await FollowServices.getFollowers(userId);

  if (followers.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `This user has no followers yet.`,
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Followers retrieved successfully.`,
    data: followers,
  });
});

// Get users a user is following
const handleGetFollowing = catchAsync(async (req, res) => {
  // const { userId } = req.params;
  const { _id: userId } = req.user;
  const following = await FollowServices.getFollowing(userId);

  if (following.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `This user is not following anyone yet.`,
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Followed users retrieved successfully.`,
    data: following,
  });
});

const handleGetAvailableUsersToFollow = catchAsync(async (req, res) => {
  // const { userId } = req.params;
  const { _id: userId } = req.user;
  const follow = await FollowServices.getAvailableUsersToFollow(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Available Followers retrieved successfully.`,
    data: follow,
  });
});

export const FollowControllers = {
  handleFollow,
  handleUnFollow,
  handleGetFollowers,
  handleGetFollowing,
  handleGetAvailableUsersToFollow,
};
