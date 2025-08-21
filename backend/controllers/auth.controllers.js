import User from '../models/user.models.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { sendNewUserEmail } from '../utils/sendNewUserEmail.js';


/* -------------------------- generate token function ----------------------------- */
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


/* -------------------------- Login controller ----------------------------- */
const userLogin=async(req ,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.json({success:false,message:"plaease provide both"})
        }
        const user= await User.findOne({email})
        if(!user){
            return res.json({success:false,message:"user does not exits"})
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
            const token= generateToken(user._id)
            return res.json({success:true,token})
           
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}


/* -------------------------- Signup controller  ----------------------------- */ 
const userSignup=async(req,res)=>{
    try {
    
        let {name,email,password}=req.body;
        if(!email ||!name || !password){
           return  res.json({success:true,message:"please provide a email"})
        }
        const user= await User.findOne({email})
        if(user){
          return res.json({success:false,message:"user already exists"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Provide a strong password"})
        }
    
        const hashPassword= await bcrypt.hash(password,10);

        const newUser=await User.create({name,email,password:hashPassword});

        const  token= generateToken(newUser._id);
        await sendNewUserEmail(newUser.email,newUser.name);
        return res.json({success:true,token})    
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
        
    }
}


/* -------------------------- googlelogin controller  ----------------------------- */ 
const googleLogin=async(req,res)=>{
   try {
     const {name,email}=req.body;
     let user
      user=await User.findOne({email});
     if(!user){
       const password=Math.floor((10000000+Math.random()*90000000)).toString();
       const hashPassword= await bcrypt.hash(password,10)
       
       const newUser=new User({
       name,
       email,
       password:hashPassword
       })
        await newUser.save();
        user=newUser
        await sendNewUserEmail(email,name)
     }  
     const token=generateToken(user._id)
     res.json({success:true,token})
   } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message});
   }
 
 }

export {userLogin,userSignup,googleLogin};