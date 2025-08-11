import express from 'express';
import cors from 'cors';
import  mongoDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.routes.js';
import userRoute from './routes/user.routes.js';
import listRoute from './routes/listing.routes.js';
import bookRoute from './routes/book.routes.js';

const app=express();
const port=4000;




app.use(express.json())
app.use(cookieParser())
app.use(cors({
     origin:"http://localhost:5173",  
     credentials: true 
}))


app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/listing',listRoute)
app.use('/api/booking',bookRoute)





app.get('/',(req,res)=>{
    res.send('api  working');
})
app.listen(port,()=>{
    mongoDB()
    console.log(`app is listening at port ${port}`);
})