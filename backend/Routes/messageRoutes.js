import {addMessage,getMessages} from '../controllers/messageController.js';

const messageRoutes = (app) => {

    app.route('/message')
    .post(addMessage)

    app.route('/message/:chatId')
    .get(getMessages)

};
export default messageRoutes;