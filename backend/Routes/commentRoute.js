 import {createComment,getComments} from '../controllers/commentController.js';
 //create a  Comments
 const commentRoute = (app) => {
    app.route('/comment')
   .post(createComment)

//    get a comment
   app.route('/comment/:postId')
      .get(getComments);



 };

 export default commentRoute;
  