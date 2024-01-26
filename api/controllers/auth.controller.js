import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === "") {
    next(errorHandler(400, "All fields are required."));
  }
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with same email already exists." });
    }
    const hashedPassword = bcryptjs.hashSync(password, 8);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "Signup successful" });
  } catch (error) {
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

export const signin = async (req, res, next) => {
  
  const { email, password } = req.body;

  if (!email || !password || password === "" || email === "") {
    next(errorHandler(400, "All fields are require.."));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User not valid.."));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password."));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const {password: pass, ...rest} = validUser._doc;

    res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest);
  } catch (error) {
    next(error);
  }
};
