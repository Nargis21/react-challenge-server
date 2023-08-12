import express from 'express';
import { WishlistRoutes } from '../modules/wishlist/wishlist.route';
import { CurrentListRoutes } from '../modules/currentList/currentList.route';
import { UserRoutes } from '../modules/user/user.route';
import { ChallengeRoutes } from '../modules/challenge/challenge.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/challenge',
    route: ChallengeRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/currentList',
    route: CurrentListRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
