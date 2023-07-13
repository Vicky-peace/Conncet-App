import sql from "mssql";
import bcrypt from "bcrypt";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

// Create a chat
export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("senderId", sql.Int, senderId)
      .input("receiverId", sql.Int, receiverId)
      .query(
        "INSERT INTO Chats (member1Id, member2Id) VALUES (@senderId, @receiverId); SELECT SCOPE_IDENTITY() AS chatId"
      );

    const chatId = result.recordset[0].chatId;
    res.status(200).json({ chatId });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  } finally {
    sql.close();
  }
};

// Getting user chat
export const userChats = async (req, res) => {
  const { userId } = req.params;
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query(
        "SELECT * FROM Chats WHERE member1Id = @userId OR member2Id = @userId"
      );

    const chats = result.recordset;
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  } finally {
    sql.close();
  }
};

export const findChat = async (req, res) => {
    const { firstId, secondId } = req.params;
    try {
      let pool = await sql.connect(config.sql);
      let result = await pool
        .request()
        .input('firstId', sql.Int, firstId)
        .input('secondId', sql.Int, secondId)
        .query('SELECT * FROM Chats WHERE (member1Id = @firstId AND member2Id = @secondId) OR (member1Id = @secondId AND member2Id = @firstId)');
  
      const chat = result.recordset[0];
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    } finally {
      sql.close();
    }
  };