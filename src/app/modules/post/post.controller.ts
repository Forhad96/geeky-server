import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../../utils/verifyJWT';

const handleCreatePost = catchAsync(async (req, res) => {
  // console.log(req.user);
  const userId = req.user._id;
  const post = await PostServices.createPost(req.body, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post Created Successfully',
    data: post,
  });
});
const handleGetAllPosts = catchAsync(async (req, res) => {
  const queryParameters = req.query as Record<string, undefined>;
  const token = req.headers.authorization;
  let user;
  if (token) {
    user = verifyToken(token, config.jwt_access_secret as string) as
      | JwtPayload
      | undefined;
  }

  // console.log(user);

  const posts = await PostServices.getAllPost(
    user && user._id,
    queryParameters
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Post Retrieves Successfully',
    data: posts,
  });
});

const handleGetSinglePost = catchAsync(async (req, res) => {
  // console.log(req.user);
  const postId = req.params.postId;
  const post = await PostServices.getSinglePost(postId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Post Retrieve Successfully',
    data: post,
  });
});
export const PostController = {
  handleCreatePost,
  handleGetAllPosts,
  handleGetSinglePost,
};
