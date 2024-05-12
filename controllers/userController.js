const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");
const { paginatedArray } = require("../helper/pagination");
const { sendSuccessResponse, sendErrorResponse } = require("../helper/utils");

const registerUser = asyncHandler(async (req, res) => {
    try {
      const { name, email, password, department } = req.body;
  
      if (!name || !email || !password) {
        res.status(400);
        throw new Error("please enter all the fields");
      }
  
      const userExists = await User.findOne({ email });
  
      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }
  
      const user = await User.create({
        name,
        email,
        password,
        department,
      });
  
      if (user) {
        sendSuccessResponse(res, {
            _id: user._id,
            name: user.name,
            email: user.email,
            department:user.department,
          })
      } else {
        sendErrorResponse(res, "Failed to create the user" , 400)
      }
    } catch (error) {
      sendErrorResponse(res, error.message )
    }
  });

  const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (user?.active === false) {
      res.status(401).json("user is not active ,ask admin to active the user or register yourself")
    } else if (user && (await user.matchPassword(password))) {

      sendSuccessResponse(res,{
        _id: user._id,
        name: user.name,
        email: user.email,
        department:user.department,
        token: generateToken(user._id),
      })
    } else {
      sendErrorResponse(res , "Invalid email or password" , 400)
    }
  });

  module.exports = {
    registerUser,
    authUser,
  }