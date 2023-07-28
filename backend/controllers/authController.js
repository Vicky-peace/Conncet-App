import sql from "mssql";
import bcrypt from "bcrypt";
import config from "../db/config.js";
import jwt from "jsonwebtoken";

// Register a user
export const register = async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  try {
    let pool = await sql.connect(config.sql);

    // Check if the user already exists
    const existingUser = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Users WHERE username= @username");
    if (existingUser.recordset.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // insert the user to the database
    await pool
      .request()
      .input("firstname", sql.VarChar, firstname)
      .input("lastname", sql.VarChar, lastname)
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)
      .query(
        "INSERT INTO Users (firstname, lastname, username, password)  VALUES (@firstname, @lastname, @username, @password)"
      );

    return res.status(200).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    sql.close();
  }
};

// Login the user
// User Login
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
   

    // Connect the database
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Users WHERE username = @username");
    console.log(result);
    const user = result.recordset[0];
    console.log(user);
    if (!user) {
      res.status(401).json({
        status: "error",
        message: "Authentication failed. User does not exist",
      });
    } else if (user) {
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(404).json({
          status: "error",
          message: "Invalid credentials",
        });
      } else {
        // create a jwt token store
        let token = `JWT ${jwt.sign(
          {
            username: user.username,
            id: user.id,
          },
          process.env.SECRET,
          { expiresIn: process.env.EXPIRY }
        )}`;

        const { id, username } = user;
        res.status(200).json({
          status: "success",
          message: "User Logged in successfully",
          id: id,
          username: username,
          token: token,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  } finally {
    sql.close();
  }
};
