import sql from 'mssql';
import bcrypt from 'bcrypt';
import config from '../db/config.js';
import jwt from 'jsonwebtoken';

export const followUser = async (req,res) =>{
    console.log(req.body);
    try{
      let {followeruserId, followeduserId} = req.body;
      let pool = await sql.connect(config.sql);
      let followUser = await pool.request()
      .input("followeruserId", sql.Int, followeruserId)
      .input("followeduserId", sql.Int, followeduserId)
      .query("INSERT INTO Relationship (followeruserId,followeduserId) VALUES (@followeruserId, @followeduserId)");
      console.log(followUser);
      res.status(200).json({
        status: "followed",
        data: followUser,
      })

    } catch(error){
        console.log(error)
        res.status(404).json(error);
    }
};

export const unfollowUser = async (req,res) =>{
    let {followeruserId, followeduserId} = req.body;
    console.log(followeduserId,followeruserId);
    try{
        let{followeruserId,followeduserId} =req.body;
        let pool = await sql.connect(config.sql);
        let unfollow = await pool.request()
        .input("followeruserId", sql.Int, followeruserId)
        .input("followeduserId", sql.Int, followeduserId)
        .query(
          "DELETE FROM Relationship WHERE followeruserId = @followeruserId AND followeduserId =  @followeduserId"
        );
        console.log(unfollow)
        res.status(200).json({
            status: "unfollowed",
            data: unfollow
        })
    } catch(error){
        console.log(error)
     res.status(404).json(error);
    }
}

// Get followers
export const getFollowers = async (req,res) => {
    try{
        const followeduserId = req.params.id;
        let pool = await sql.connect(config.sql)
        let followers = await pool.request()
        .query(`SELECT followeruserId FROM Relationship WHERE followeduserId=${followeduserId}`);

        console.log(followers);
        res.status(200).json(
            followers.recordset.map((relationship) => relationship.followeruserId)
        );
    } catch (error){
        console.log(error)
        res.status(404).json(error);
    }
}