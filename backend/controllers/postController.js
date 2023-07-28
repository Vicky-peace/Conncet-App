import sql from "mssql";
import bcrypt from "bcrypt";
import config from "../db/config.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// Creating a post
export const createPost = async (req, res) => {
  const { userId, desc, likes, createdAt, image } = req.body;
  try {
    // Connect to the database
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("desc", sql.NVarChar(sql.MAX), desc)
      .input("createdAt", sql.DateTime, createdAt)
      .input("image", sql.NVarChar(sql.MAX), image)
      .query(
        "INSERT INTO Posts (userId, [desc],  createdAt, [image]) VALUES (@userId, @desc,  @createdAt, @image); SELECT SCOPE_IDENTITY() AS postId"
      );

    const postId = result.recordset[0].postId;
    const createdPost = {
      postId,
      userId,
      desc,
      createdAt,
      image,
    };
    res.status(200).json({
      status: "success",
      data: createdPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .query("SELECT p.*, u.id AS userId, username, profilePicture FROM Posts AS p JOIN Users as u ON (u.id = p.userId)");

    res.status(200).json({
      status: "success",
      data: result.recordset,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  } finally {
    sql.close();
  }
};

// Get a single post
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Posts WHERE id = @id");
    if (result.recordset.length === 0) {
      res.status(404).json({ message: "Post not found" });
    } else {
      const post = result.recordset[0];
      res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};

// Update post

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { userId, desc, likes, createdAt, image } = req.body;
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("userId", sql.Int, userId)
      .input("desc", sql.NVarChar(sql.MAX), desc)
      .input("likes", sql.NVarChar(sql.MAX), JSON.stringify(likes))
      .input("createdAt", sql.DateTime, createdAt)
      .input("image", sql.NVarChar(sql.MAX), image)
      .query(
        "UPDATE Posts SET userId = @userId, [desc] = @desc, likes = @likes, createdAt = @createdAt, [image] = @image WHERE id = @id"
      );
    // console.log(result)
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json({ message: "Post updated" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};

// Delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Posts WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json({ message: "Post deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};

// Like a post
// export const likePost = async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body;

//   try {
//     let pool = await sql.connect(config.sql);
//     const result = await pool
//       .request()
//       .input("id", sql.Int, id)
//       .input("userId", sql.Int, userId)
//       .query("SELECT likes FROM Posts WHERE id = @id");
//     if (result.recordset.length === 0) {
//       res.status(404).json({ message: "Post not found" });
//       return;
//     }
//     const postLikes = JSON.parse(result.recordset[0].likes);

//     if (postLikes.includes(userId)) {
//       const updatedLikes = postLikes.filter((like) => like !== userId);
//       await pool
//         .request()

//         .input("id", sql.Int, id)
//         .input("likes", sql.NVarChar(sql.MAX), JSON.stringify(updatedLikes))
//         .query("UPDATE Posts SET likes = @likes WHERE id = @id");

//       res.status(200).json({ message: "Post disliked" });
//     } else {
//       const updatedLikes = [...postLikes, userId];
//       await pool
//         .request()
//         .input("id", sql.Int, id)
//         .input("likes", sql.NVarChar(sql.MAX), JSON.stringify(updatedLikes))
//         .query("UPDATE Posts SET likes = @likes WHERE id = @id");

//       res.status(200).json({ message: "Post liked" });
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: error.message });
//   } finally {
//     sql.close();
//   }
// };

// Get timeline posts

export const getTimelinePosts = async (req, res) => {
  const { userId } = req.params;

  try {
    let pool = await sql.connect(config.sql);
    const currentUserPostsResult = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query("SELECT * FROM Posts WHERE userId = @userId");

    const followingPostsResult = await pool
      .request()
      .input("userId", sql.Int, userId)
      .query(
        "SELECT p.* FROM Users u INNER JOIN Posts p ON u.id = p.userId WHERE u.id IN (SELECT following FROM Users WHERE id = @userId)"
      );

    const currentUserPosts = currentUserPostsResult.recordset;
    const followingPosts = followingPostsResult.recordset;

    const timelinePosts = [...currentUserPosts, ...followingPosts].sort(
      (a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    );

    res.status(200).json(timelinePosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    sql.close();
  }
};


export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT likes FROM Posts WHERE id = @id");

    if (result.recordset.length === 0) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const postLikes = JSON.parse(result.recordset[0].likes) ?? [];

    if (postLikes.includes(userId)) {
      const updatedLikes = postLikes.filter((like) => like !== userId);
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("likes", sql.NVarChar(sql.MAX), JSON.stringify(updatedLikes))
        .query("UPDATE Posts SET likes = @likes WHERE id = @id");

      res.status(200).json({
        status: 'success',
        message: "Post disliked"
      });
    } else {
      const updatedLikes = [...postLikes, userId];
      await pool
        .request()
        .input("id", sql.Int, id)
        .input("likes", sql.NVarChar(sql.MAX), JSON.stringify(updatedLikes))
        .query("UPDATE Posts SET likes = @likes WHERE id = @id");

      res.status(200).json({
        status: 'success',
        message: "Post liked"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    sql.close(); // Close the connection pool properly after finishing the queries.
  }
};


