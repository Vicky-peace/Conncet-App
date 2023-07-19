import sql from "mssql";
import bcrypt from "bcrypt";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

export const likePost = async (req, res) => {
    let { userId} = req.body;
    let {id} = req.params;
    try {
     
      let pool = await sql.connect(config.sql);
      let createdLikes = await pool
        .request()
        .input("userId", sql.Int, userId)
        .input("id", sql.Int, id)
        .input("likes", sql.NVarChar(sql.MAX))
        .query(
          "UPDATE Posts SET likes = @likes WHERE id = @id"
        );
      console.log(createdLikes);
      res.status(200).json({
        status: "success",
        data: createdLikes,
      });
    } catch (err) {
        console.log(err)
      res.status(404).json(err);
    }
  };