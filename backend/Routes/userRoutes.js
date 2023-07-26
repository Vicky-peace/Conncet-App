import {getUser, getAllUsers,updateUser,deleteUser,suggestedUsers} from '../controllers/userController.js';

const userRoutes = (app) =>{
    app.route('/user/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)
   
    app.route('/users')
    .get( getAllUsers)

    app.route('/suggested/:userId')
    .get(suggestedUsers)
    
   

};
export default userRoutes;