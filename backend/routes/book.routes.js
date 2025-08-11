import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { cancelBooking, createBooking } from '../controllers/booking.controllers.js';


const bookRoute=express.Router()
bookRoute.post('/create/:id',isAuth,createBooking)
bookRoute.delete('/cancel/:id',isAuth,cancelBooking)
export default bookRoute