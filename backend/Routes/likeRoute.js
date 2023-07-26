import {getLikes,createLikes,deleteLikes } from '../controllers/likeController.js';

const likeRoute = (app) =>{

    app.route('/api/likes')
    .post(createLikes )


    app.route('/api/likes/:id')
    .get(getLikes)

    app.route('/api/likes/:id')
     .delete(deleteLikes)

};
export default likeRoute;