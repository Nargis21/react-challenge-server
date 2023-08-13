"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_route_1 = require("../modules/wishlist/wishlist.route");
const currentList_route_1 = require("../modules/currentList/currentList.route");
const user_route_1 = require("../modules/user/user.route");
const challenges_route_1 = require("../modules/challenges/challenges.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/challenges',
        route: challenges_route_1.ChallengeRoutes,
    },
    {
        path: '/wishlist',
        route: wishlist_route_1.WishlistRoutes,
    },
    {
        path: '/currentList',
        route: currentList_route_1.CurrentListRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
