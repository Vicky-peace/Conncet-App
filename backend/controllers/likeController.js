import sql from "mssql";
import bcrypt from "bcrypt";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

export const createLikes = async (req, res) => {
  try {
    let { likesuserId, postuserId } = req.body;
    let pool = await sql.connect(config.sql);
    let createdLikes = await pool
      .request()
      .input("likesuserId", sql.Int, likesuserId)
      .input("postuserId", sql.Int, postuserId)
      .query(
        "INSERT INTO Likes (likesuserId,postuserId) VALUES (@likesuserId, @postuserId)"
      );
    console.log(createdLikes);
    res.status(200).json({
      status: "success",
      data: createdLikes,
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

export const getLikes = async (req, res) => {
  try {
    const postId = req.params.id;
    let pool = await sql.connect(config.sql);
    let likes = await pool
      .request()
      .query(`SELECT likesuserId FROM Likes WHERE postuserId=${postId}`);
    console.log(likes);
    res.status(200).json(likes.recordset.map((like) => like.likesuserId));
  } catch (err) {
    res.status(404).json(err);
  }
};

export const deleteLikes = async (req, res) => {
  const id = req.params.id;
  let { likesuserId, postuserId } = req.body;
  try {
    let pool = await sql.connect(config.sql);
    let deletedLikes = await pool
      .request()
      .input("likesuserId", sql.Int, likesuserId)
      .input("postuserId", sql.Int, postuserId)
      .query(
        `DELETE FROM  Likes WHERE  postuserId = ${id}  AND likesuserId= @likesuserId`
      );
    console.log(deletedLikes);
    res.status(200).json({
      status: "success",
      data: deletedLikes,
    });
  } catch (err) {
    res.status(404).json(err);
  }
};