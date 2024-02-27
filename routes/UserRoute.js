import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc		user login
 * @route		POST /login
 * @access	public
 */

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.json({
      user: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res
      .status(401)
      .json({ message: "Invalid email or password" }); /* Unauthorized*/
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc Register new user
 * @route POST/api/users
 * @access public
 */

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User Already Exist" }); /* Bad request*/
    throw new Error("User Already Exist");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    console.log(user._id, "47");
    // 201 - successfully created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { loginUser, registerUser };
