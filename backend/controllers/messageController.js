import sql from 'mssql';
import config from '../db/config.js';


// Sending a message
export const addMessage = async (req,res) =>{
    const {chatId, senderId, text} = req.body;

    try{
       
        let pool = await sql.connect(config.sql);
        let message = await pool.request()
        .input('chatId', sql.Int, chatId)
        .input('senderId', sql.Int, senderId)
        .input('text', sql.NVarChar(sql.MAX), text)
        .query('INSERT INTO Message (chatId, senderId, text) VALUES (@chatId, @senderId, @text); SELECT SCOPE_IDENTITY() AS messageId');

        res.status(200).json({
            status: "success",
            data: message,
        });
    } catch(error){
        console.log(error)
        res.status(500).json(error);
    }}


// Get messages 
export const getMessages =  async (req,res) => {
    const {chatId} = req.params;

    try{
         let pool = await sql.connect(config.sql);
         let message = await pool.request()
       
         .query(`SELECT * FROM Message WHERE chatId= ${chatId}`);
         res.status(200).json(message.recordsets[0]);

    } catch(error){
        console.log(error)
        res.status(500).json(error);
    } 
}