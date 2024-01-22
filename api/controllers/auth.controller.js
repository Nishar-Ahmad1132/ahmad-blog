import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;


   if (!username || !email || !password || username === "") {
      next(errorHandler(400, "All fields are required."));
   }
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User with same email already exists." });
    }
    const hashedPassword = bcryptjs.hashSync(password, 8);
    // If the username doesn't exist, create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "Signup successful" });

  } catch (error) {
    // Check for duplicate key error (E11000) and handle it
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      res
        .status(400)
        .json({ message: `${Object.keys(error.keyValue)[0]} already exists.` });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
    next(error);
  }
};
