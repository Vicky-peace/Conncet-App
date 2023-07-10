import sql from 'mssql';
import bcrypt from 'bcrypt';
import config from '../db/config.js';
import jwt from 'jsonwebtoken';

// Create a chat
export const createChat = async (req,res) =>{
    const {senderId} = req.body;
    const {receiverId}= req.body;

    try{
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input('senderId', sql.Int, senderId)
        .input('receiverId', sql.Int, receiverId)
        .query('INSERT INTO Chats (member1Id, member2Id, createdAt, updatedAt) VALUES (@senderId, @receiverId,GETDATE(), GETDATE())');

        res.status(200).json(result);

    } catch(error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        sql.close();
    }
}

// get user chats
export const userChats = async (req,res) => {
    const {userId} = req.params ;

    try{
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input('userId', sql.Int, userId)
        .query('SELECT * FROM Chats WHERE member1Id = @userId OR member2Id = @userId');

        res.status(200).json(result.recordset);

    } catch(error){
        console.log(error);
        res.status(500).json(error);
    }finally {
        sql.close();
    }
}

// find a chat
export const findChat = async (req,res) => {
    const {firstid} = req.params;
    const {secondId} = req.params;

    try{
   let pool = await sql.connect(config.sql);
    const result = await pool.request()
    // .input('firstId', sql.Int, firstid)
    // .input('secondId', sql.Int, secondId)
    .query('SELECT * FROM Chats WHERE (member1Id = @firstId AND member2Id = @secondId) OR (member1Id = @secondId AND member2Id = @firstId')

    res.status(200).json(result.recordset);
    }catch(error){

    } finally{
        sql.close();
    }
}