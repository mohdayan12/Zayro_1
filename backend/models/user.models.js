import mongoose from "mongoose";

 const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,

    },
    otpExpire:{
        type:Date
    },
    listing:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    }],
    booking:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    }]

 },{timestamps:true})
 const User=mongoose.model('User',userSchema)
 export default User;