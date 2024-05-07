import jwt from "jsonwebtoken";
import asyncHandler from "./async.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../modals/User.modal.js";


export const protecter = asyncHandler(async (req, res, next) => {
   let token;
   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
   }
   
   if (!token) {
      return next(new ErrorResponse('Token is not found!', 401));
   }
   try {
      const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);

      req.user = await User.findById(decode.id);

      next();
   } catch (error) {
      return next(new ErrorResponse('You dont have aceess to this request', 401));
   }
})

export const authenticate = asyncHandler(async (req, res, next) => {
   if (req.user.role === "Admin" || req.user.role === "Super Admin") {
      next();
   } else {
      return next(new ErrorResponse(`You dont have access to this route with user role ${req.user.role}`, 403));
   }
})