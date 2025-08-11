import express from 'express'
import { userLogin, userSignup } from '../controllers/auth.controllers.js';

const authRoute=express.Router();
authRoute.post('/signup',userSignup)
authRoute.post('/login',userLogin)

export default authRoute;