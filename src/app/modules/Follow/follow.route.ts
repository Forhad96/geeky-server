import { Router } from 'express';
import { FollowControllers } from './follow.controller';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../User/user.constant';

const router = Router();


// Follow a user
router.post('/create-follow', FollowControllers.handleFollow);
// Unfollow a user
router.delete('/unfollow', FollowControllers.handleUnFollow);

// Get followers of a user
router.get('/followers/:userId', FollowControllers.handleGetFollowers);

// Get users this user is following
router.get('/following/:userId', FollowControllers.handleGetFollowing);

router.get("/available-follow/:userId",FollowControllers.handleGetAvailableUsersToFollow)



export const FollowRoutes = router;
