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

// // Get all users
// export const getAllUsers = (req, res) => {
//     try{
//         let pool = await sql.connect(config.sql);
//         let
//     }
// }