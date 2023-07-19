import express from 'express';
import {
    followUser, unfollowUser,getFollowers
} from '../controllers/followersController.js';

const followRoutes = (app) => {
    app.route('/follow')
    .post(followUser)

    app.route('/follow/:id')
    .get(getFollowers)

    app.route('/unfollow')
    .post(unfollowUser)
};

export default followRoutes;