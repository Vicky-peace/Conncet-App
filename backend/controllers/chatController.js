import sql from "mssql";
import bcrypt from "bcrypt";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

// Create a chat
export const createChat = async (req, res) => {
  const { senderId, receiverId, userId } = req.body;
  try {
    let pool = await sql.connect(config.sql);
    let createdChat = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("members", sql.NVarChar, `[${senderId},${receiverId}]`)
      .query(
        "INSERT INTO Chat(members,userId)VALUES(@members,@userId)"
      );
      console.log(createdChat);
      res.status(200).json({
        status: "success",
        data: createdChat,
      });

  
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    sql.close();
  }
};

// Getting user chat
export const userChats = async (req, res) => {
  try {
    const id = req.params.userId;
    let pool = await sql.connect(config.sql);
    let posts = await pool
      .request()
      .query(`SELECT * FROM Chat WHERE userId=${id} OR members LIKE '%${id}%'`);
    console.log(posts);
    res.status(200).json({
      status: "success",
      data: posts.recordsets[0],
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

export const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("members", sql.NVarChar, `[${firstId},${secondId}]`)
      .query(`SELECT * FROM Chat WHERE members=@members`);
    
      res.status(200).json({
        status: "success",
        data: result.recordsets,
      });
   
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  } finally {
    sql.close();
  }
};
