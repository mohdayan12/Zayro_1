import express from 'express'
import { googleLogin, userLogin, userSignup } from '../controllers/auth.controllers.js';

const authRoute=express.Router();
authRoute.post('/signup',userSignup)
authRoute.post('/login',userLogin)
authRoute.post('/googleLogin',googleLogin)

export default authRoute;