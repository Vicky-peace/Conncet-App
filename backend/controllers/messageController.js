import sql from 'mssql';
import config from '../db/config.js';


// Sending a message
export const addMessage = async (req,res) =>{
    const {chatId, senderId, text} = req.body;

    try{
       
        let pool = await sql.connect(config.sql);
        let result = await pool.request()
        .input('chatId', sql.Int, chatId)
        .input('senderId', sql.Int, senderId)
        .input('text', sql.NVarChar(sql.MAX), text)
        .query('INSERT INTO Messages (chatId, senderId, text) VALUES (@chatId, @senderId, @text); SELECT SCOPE_IDENTITY() AS messageId');

        const messageId = result.recordset[0].messageId;
        res.status(200).json({messageId});
    } catch(error){
        res.status(500).json(error);
    }finally{
        sql.close();
    }
}


// Get messages 
export const getMessages =  async (req,res) => {
    const {chatId} = req.params;

    try{
         let pool = await sql.connect(config.sql);
         let result = await pool.request()
         .input('chatId', sql.Int, chatId)
         .query('SELECT * FROM Messages WHERE chatId = @chatId')

         const messages = result.recordset;
         res.status(200).json(messages);

    } catch(error){
        
        res.status(500).json(error);
    } finally{
        sql.close();
    }
}