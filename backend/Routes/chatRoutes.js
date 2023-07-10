import {createChat, userChats,findChat} from '../controllers/chatController.js';

const chatRoutes = (app) => {
    app.route('/chat')
     .post(createChat)

     app.route('/chat/:id')
     .get(userChats)

     app.route('/find/:firstId/:secondId')
     .get(findChat)
};
export default chatRoutes;