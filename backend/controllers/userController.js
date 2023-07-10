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
    try{
        let pool = await sql.connect(config.sql);
        let user = await pool.request()
        .input('id', sql.Int , id )
        .query('SELECT * FROM Users WHERE id = @id')
        // console.log(user.recordsets[0])
        // const user= result.recordset[0];
        !user.recordsets[0] ? res.status(404).json({message: "User not found"}) : res.status(200).json({
            status: 'success',
            user: user.recordset[0]
        });
    } catch(error){
        res.status(404).json({message: err.message});
    } finally{
        sql.close();
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


//   Update a user
export const updateUser = async (req, res) => {
    const {id} = req.params;
    try{
        const { username,password , firstname ,lastname, isAdmin, profilepicture, coverpicture, about,livesIn, worksAt,relationship,country} = req.body;

        let pool = await sql.connect(config.sql);
        let updateUser = await pool.request()
        .input('id',sql.Int,id)
        .input('username',sql.VarChar,username)
        .input('firstname',sql.VarChar,firstname)
        .input('lastname',sql.VarChar,lastname)
        .input('password',sql.VarChar,password)
        .query('UPDATE Users SET username=@username, firstname=@firstname,password=@password WHERE id= @id') 

        res.status(200).json({
            status:'success',
            message: 'User updated successfully',
            data:updateUser
        })
    } catch(error){
        res.status(404).json({message: error.message});
    }finally{
        sql.close();
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

// Follow a user
export const followUser = async(req,res) =>{
    const {id} = req.params;
    const {_id}  = req.body;
    
    // Forbids user to follow themselves
    if(_id == id){
        res.status(403).json("Action Forbidden");
    } else{
        try {
           let pool = await sql.connect(config.sql);
           const followUserResult = await pool.request()
            .query('SELECT * FROM Users WHERE id = @id');
            const followingUserResult = await pool.request()
             .query ('SELECT * FROM Users WHERE id = @_id');
      
            if (
              followUserResult.recordset.length > 0 &&
              followingUserResult.recordset.length > 0
            ) {
              const followUser = followUserResult.recordset[0];
              const followingUser = followingUserResult.recordset[0];
      
              if (!followUser.followers.includes(_id)) {
                await pool.request()
                .query`
                  UPDATE Users
                  SET followers = ARRAY_APPEND(followers, ${_id})
                  WHERE id = ${id};
      
                  UPDATE Users
                  SET following = ARRAY_APPEND(following, ${id})
                  WHERE id = ${_id};
                `;
      
                res.status(200).json("User followed!");
              } else {
                res.status(403).json("You are already following this user.");
              }
            } else {
              res.status(404).json("User not found");
            }
          } catch (error) {
            res.status(500).json(error);
          } finally {
            sql.close();
    }

}
};