import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  console.log("protect-6", req.body);
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log("protect-16", req.body);
      next();
    } catch (error) {
      console.error(error);
      throw new Error("Not authorized, token failed");
    }
  } else {
    throw new Error("No token found");
  }
});

export { protect };
