import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { MeilisearchRoutes } from '../modules/Meilisearch/meilisearch.routes';
import { PostRoutes } from '../modules/post/post.route';
import { FollowRoutes } from '../modules/Follow/follow.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/search-items',
    route: MeilisearchRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/follows',
    route: FollowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
