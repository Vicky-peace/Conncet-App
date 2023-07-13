import {createPost, getPost,updatePost,deletePost,likePost,getTimelinePosts} from '../controllers/postController.js';

const postRoutes = (app) => {
    app.route('/post')
    .post(createPost)

    app.route('/post/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)

    app.route('/:id/like')
    .put(likePost)
    
    app.route('/timeline/:id')
    .get(getTimelinePosts)
};
export default postRoutes;