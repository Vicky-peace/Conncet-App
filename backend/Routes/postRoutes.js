import {createPost, getPost,updatePost,deletePost,likePost,getTimelinePosts, getPosts } from '../controllers/postController.js';

const postRoutes = (app) => {
    app.route('/post')
    .post(createPost)
    .get( getPosts )

    app.route('/post/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)

    app.route('/like/:id')
    .put(likePost)
    
    app.route('/timeline/:id')
    .get(getTimelinePosts)
};
export default postRoutes;