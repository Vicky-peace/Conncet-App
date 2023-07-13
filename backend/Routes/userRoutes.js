import {getUser, getAllUsers,updateUser,deleteUser, followUser,unfollowUser} from '../controllers/userController.js';

const userRoutes = (app) =>{
    app.route('/user/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)
   
    app.route('/users')
    .get( getAllUsers)

    app.route('users/follow/:id')
    .post(followUser)
    
    app.route('/users/unfollow/:id')
    .post(unfollowUser)

};
export default userRoutes;