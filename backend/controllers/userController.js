import sql from 'mssql';
import bcrypt from 'bcrypt';
import config from '../db/config.js';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
    if(req.user){
        next();
    } else {
        return res.status(401).json({message: "Unathorized user!"});
    }
};

// // Get a user
export const getUser = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    try{
        let pool = await sql.connect(config.sql);
        let userOne = await pool.request()
        .input("id", sql.Int , id )
        .query("SELECT * FROM Users WHERE id = @id")
        // console.log(user.recordsets[0])
        // const user= result.recordset[0];
        !userOne.recordsets[0] ? 
        res.status(404).json({message: "User not found"}) : res.status(200).json({
            status: 'success',
            user: userOne.recordset[0],
        });
    } catch(error){
      console.log(error)
        res.status(404).json({message: error.message});
    } 
    }        


    // Get all users
  export const getAllUsers = async (req, res) => {
    
    try{
       let pool = await sql.connect(config.sql);
       const result = await pool.request()
       .query('SELECT * FROM Users')
       
    const users = result.recordset.map((user) => {
        const { password, ...otherDetails } = user;
        return otherDetails;
      });
      res.status(200).json(users);
    } catch(error){
        res.status(404).json(error);
    } finally{
        sql.close();
    }
  }




export const updateUser = async (req, res) => {
  const {id} = req.params;
  const {
    username,
    firstname,
    password,
    lastname,
    coverPicture,
    profilePicture,
    about,
    livesIn,
    worksAt,
    relationship,
    country

  } = req.body;
  // const hashedpwd = bcrypt.hashSync(password, 10);
  try{
    let pool = await sql.connect(config.sql);
  let updatedUser = await pool.request()

  .input('id', sql.Int, id)
  .input('firstname', sql.NVarChar(255), firstname)
  .input('lastname', sql.NVarChar(255), lastname)
  .input('profilePicture', sql.NVarChar(sql.MAX), profilePicture)
  .input('coverPicture', sql.NVarChar(sql.MAX), coverPicture)
  .input('about', sql.NVarChar(sql.MAX), about)
  // .input('password', sql.NVarChar(sql.MAX), hashedpwd)
  .input('livesIn', sql.NVarChar(255), livesIn)
  .input('worksAt', sql.NVarChar(255), worksAt)
  .input('relationship', sql.NVarChar(255), relationship)
  .input('country', sql.NVarChar(255), country)
  .query('UPDATE Users SET firstname = @firstname, lastname = @lastname, profilePicture = @profilePicture, coverPicture = @coverPicture, about = @about, livesIn = @livesIn, worksAt = @worksAt, relationship = @relationship, country = @country WHERE id = @id');
 
  console.log(updatedUser);
  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
} catch(error){
  console.log(error)
  res.status(404).json({message: error})
}


  }
  
 

// Delete a user
export const deleteUser = async(req,res) =>{
    const {id} = req.params;
    try{
        let pool = await sql.connect(config.sql);
        await pool.request()
        .input('id',sql.Int,id)
        .query('DELETE FROM Users WHERE id= @id')

        res.status(200).json({
                    status:'success',
                    message: 'User deleted successfully'
                })
            
    } catch (error){
        res.status(404).json({message: error.message});
    } finally{
        sql.close();
    }
}

// // Follow a user
// export const followUser = async (req, res) => {
//   const id = req.params.id;
//   const { _id } = req.body;

//   if (_id === id) {
//     res.status(403).json("Action Forbidden");
//   } else {
//     try {
//       const pool = await sql.connect(config.sql);

//       const followUserResult = await pool
//         .request()
//         .input("userId", sql.Int, id)
//         .input("followerId", sql.Int, _id)
//         .query("INSERT INTO Followers (userId, followerId) VALUES (@userId, @followerId)");

//       if (followUserResult.rowsAffected[0] === 1) {
//         res.status(200).json("User followed!");
//       } else {
//         res.status(403).json("You are already following this user");
//       }
//     } catch (error) {
//       res.status(500).json(error.message);
//     } finally {
//       sql.close();
//     }
//   }
// };

// // UnfollowUser

// export const unfollowUser = async (req, res) => {
//   const id = req.params.id;
//   const { _id } = req.body;

//   if (_id === id) {
//     res.status(403).json("Action Forbidden");
//   } else {
//     try {
//       const pool = await sql.connect(config.sql);

//       const unfollowUserResult = await pool
//         .request()
//         .input("userId", sql.Int, id)
//         .input("followerId", sql.Int, _id)
//         .query("DELETE FROM Followers WHERE userId = @userId AND followerId = @followerId");

//       if (unfollowUserResult.rowsAffected[0] === 1) {
//         res.status(200).json("Unfollowed successfully!");
//       } else {
//         res.status(403).json("You are not following this user");
//       }
//     } catch (error) {
//       res.status(500).json(error.message);
//     } finally {
//       sql.close();
//     }
//   }
// };

// Follow user
// export const followUser = async (req, res) => {
//   const id = req.params.id;
//   const { _id } = req.body;

//   if (_id === id) {
//     res.status(403).json("Action Forbidden");
//   } else {
//     try {
//       const pool = await sql.connect(config.sql);

//       const followUserResult = await pool
//         .request()
//         .input("userId", sql.Int, id)
//         .input("followerId", sql.Int, _id)
//         .query("UPDATE Users SET followers = CONCAT(followers, ',', @userId) WHERE id = @userId");

//       if (followUserResult.rowsAffected[0] === 1) {
//         res.status(200).json("User followed!");
//       } else {
//         res.status(403).json("You are already following this user");
//       }
//     } catch (error) {
//       console.log(error)
//       res.status(500).json(error.message);
//     } finally {
//       sql.close();
//     }
//   }
// };

// export const unfollowUser = async (req, res) => {
//   const id = req.params.id;
//   const { _id } = req.body;

//   if (_id === id) {
//     res.status(403).json("Action Forbidden");
//   } else {
//     try {
//       const pool = await sql.connect(config.sql);

//       const unfollowUserResult = await pool
//         .request()
//         .input("userId", sql.Int, id)
//         .input("followerId", sql.Int, _id)
//         .query("UPDATE Users SET followers = REPLACE(followers, CONCAT(',', @followerId), '') WHERE id = @userId");

//       if (unfollowUserResult.rowsAffected[0] === 1) {
//         res.status(200).json("Unfollowed successfully!");
//       } else {
//         res.status(403).json("You are not following this user");
//       }
//     } catch (error) {
//       res.status(500).json(error.message);
//     } finally {
//       sql.close();
//     }
//   }
// };


