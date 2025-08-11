import express from 'express'
import isAuth from '../middleware/isAuth.js'
import upload from '../middleware/multer.js';
import { addListing, allListing, deleteListing, editListing, findListing, ratingListing, searchListing } from '../controllers/listing.controllers.js';
const listRoute=express.Router();
listRoute.get('/findlistingById/:id',isAuth,findListing )
listRoute.post('/allListing',allListing)
listRoute.post('/delete',isAuth,deleteListing)
listRoute.post('/submitRating/:id',isAuth,ratingListing)
listRoute.get('/search',searchListing)

listRoute.post('/add',isAuth,upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1},
    {name:"image4",maxCount:1},
]),addListing)

listRoute.post('/update/:id',isAuth,upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1},
    {name:"image4",maxCount:1},
]),editListing)

export  default listRoute;