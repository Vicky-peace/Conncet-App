import sql from "mssql";
import bcrypt from "bcrypt";
import config from "../db/config.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const createComment = async (req, res) => {
    // console.log(req.body);
    // console.log(token);
    const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    console.log(createdAt);
    try {
      let { description, userId, postId } = req.body;
      let pool = await sql.connect(config.sql);
      let createdComment = await pool
        .request()
        .input("description", sql.VarChar, description)
        .input("userId", sql.Int, userId)
        .input("postId", sql.Int, postId)
        .input("createdAt", sql.DateTime, createdAt)
        .query(
          "INSERT INTO Comments (description,userId,postId,createdAt) VALUES (@description, @userId,@postId,@createdAt)"
        );
      console.log(createdComment);
      res.status(200).json({
        status: "success",
        data: createdComment,
      });
    } catch (err) {
        console.log(err);
      res.status(404).json(err);
    }
  };


//   Get comments

export const getComments = async (req,res) => {
    try{
        const {postId} = req.params;
        let pool = await sql.connect(config.sql);
        let comments = await pool.request()
        .query(
            `SELECT c.*,u.id AS userId,username,profilePicture FROM Comments AS c JOIN Users AS u ON (u.id = c.userId)
            WHERE c.postId = ${postId} ORDER BY c.createdAt DESC
           `
        );
        console.log(comments);
        res.status(200).json(comments.recordset);
    } catch(error){
        console.log(error);
        console.log(error)
        res.status(404).json(error);
    }
}

// update comments

export const updateComment = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    console.log(req.body);
    const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    console.log(createdAt);
    let { description, commentuserId, postId } = req.body;
    let pool = await sql.connect(config);
    let updatedComment = await pool
      .request()
      .input("id", sql.Int, id)
      .input("description", sql.VarChar, description)
      .input("commentuserId", sql.Int, commentuserId)
      .input("postId", sql.Int, postId)
      .input("createdAt", sql.DateTime, createdAt).query(`UPDATE comments
     SET description = COALESCE(@description, description),
     commentuserId = COALESCE(@commentuserId, commentuserId),
     postId = COALESCE(@postId, postId),
     createdAt = COALESCE(@createdAt, createdAt)
     WHERE id = @id
     `);
    console.log(updatedComment);
    res.status(200).json({
      status: "success",
      comment: updatedComment,
    });
  };