import express from 'express'
import isAuth from '../middleware/isAuth.js';
import { forgetPassword, getCurrentUser, resetOtp, resetPassword, sendMessage, verifyOtp } from '../controllers/user.controllers.js';



const userRoute=express.Router()
  userRoute.get('/currentuser',isAuth,getCurrentUser)
  userRoute.post('/forget-password',forgetPassword)
  userRoute.post('/verify-otp',verifyOtp)
  userRoute.post('/reset-otp',resetOtp)
  userRoute.post('/reset-password',resetPassword)
 userRoute.post('/contact',sendMessage)
export default userRoute;