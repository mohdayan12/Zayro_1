import mongoose from 'mongoose'




const listSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    city:{
       type:String,
       required:true
    },
     landmark:{
       type:String,
       required:true
    },
    price:{
        type:Number,
        required:true
    },
    image1:{
        type:String,
        required:true
    },
     image2:{
        type:String,
        
    },
     image3:{
        type:String,
        
    },
     image4:{
        type:String,
    
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        default:0
    },
    guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isBooked:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
const Listing=mongoose.model("Listing",listSchema)
export default Listing;