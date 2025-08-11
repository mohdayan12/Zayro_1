import mongoose from "mongoose";
import 'dotenv/config'
const mongoDB=async()=>{
     mongoose.connection.on("connected",()=>{
       console.log("mongobd is connected");
     })
     await mongoose.connect(`${process.env.MONGODB_URL}`)
    
}
 export default mongoDB;
