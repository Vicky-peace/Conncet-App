import {getUser, getAllUsers,updateUser,deleteUser, followUser} from '../controllers/userController.js';

const userRoutes = (app) =>{
    app.route('/user/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)
    .post(followUser)

    app.route('/users')
    .get( getAllUsers)
};
export default userRoutes;