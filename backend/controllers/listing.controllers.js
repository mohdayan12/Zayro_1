import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../models/listing.models.js";
import User from "../models/user.models.js";


 /* -------------------------- Add Listing controller ----------------------------- */
const addListing=async(req,res)=>{
try {
    const host=req.userId
    const {title,description,city,landmark,price}=req.body
     const image1 = req.files?.image1?.[0]?.path ? await uploadOnCloudinary(req.files.image1[0].path) : null;
    const image2 = req.files?.image2?.[0]?.path ? await uploadOnCloudinary(req.files.image2[0].path) : null;
    const image3 = req.files?.image3?.[0]?.path ? await uploadOnCloudinary(req.files.image3[0].path) : null;
    const image4 = req.files?.image4?.[0]?.path ? await uploadOnCloudinary(req.files.image4[0].path) : null;
   

   const list=await Listing.create({
       title,description,price,city,landmark,image1,image2,image3,image4,host
    })
    const user=await User.findByIdAndUpdate(host,{$push:{listing:list._id}},{new:true})
    if(!user){
        return res.json({success:false,message:"user not found"})
    }
    return res.json({success:true,list});  
} catch (error) {
   console.log(error)
    return res.json({success:false,message:"Server Error!"});
    
}
}


/* -------------------------- All Listing controller ----------------------------- */
const allListing=async(req,res)=>{
    try {
        const allListing=await Listing.find().sort({createdAt:-1})

        return res.json({success:true,allListing})
        
    } catch (error) {
         console.log(error)
        return res.json({success:false,message:"Server Error!"});
        
    }
}


/* -------------------------- View one Listing controller  ----------------------------- */
const findListing=async(req,res)=>{
    try {
        const {id}=req.params
        const listing=await Listing.findById(id)
        if(!listing){
          return res.json({success:false,message:"Listing not found"})
        }
        res.json({success:true,listing})
    } catch (error) {
         console.log(error)
        return res.json({success:false,message:"Server Error!"});
    }
}


/* -------------------------- update  Listing controller ----------------------------- */
const editListing=async(req,res)=>{
   
   try {
   const {id}=req.params
    const { title, description, city, landmark, price } = req.body;
   const updatedData = { title, description, price, city, landmark }

if (req.files?.image1?.[0]?.path) {
  updatedData.image1 = await uploadOnCloudinary(req.files.image1[0].path)
}
if (req.files?.image2?.[0]?.path) {
  updatedData.image2 = await uploadOnCloudinary(req.files.image2[0].path)
}
if (req.files?.image3?.[0]?.path) {
  updatedData.image3 = await uploadOnCloudinary(req.files.image3[0].path)
}
if (req.files?.image4?.[0]?.path) {
  updatedData.image4 = await uploadOnCloudinary(req.files.image4[0].path)
}

const list = await Listing.findByIdAndUpdate(id, updatedData, { new: true })

  return res.json({ success: true, list })
   } catch (error) {
    console.error(error)
     return res.json({success:false,message:"Server Error!"})
   }
}


/* -------------------------- Delete Listing controller ----------------------------- */
const deleteListing=async(req,res)=>{
    try {
       const {listingId}=req.body
    
        const listing=await Listing.findByIdAndDelete(listingId)
        const user=await User.findByIdAndUpdate(listing.host,{$pull:{listing:listing._id}},{new:true})
        if(!user){
          return res.json({success:false,message:"user is not found"})
        }
       return res.json({success:true,message:"list is deleted"})
    } catch (error) {
        console.error(error)
        return res.json({success:false,message:"Server Error!"})
    }
   
}


/* -------------------------- Given Star to Listing controller ----------------------------- */
const ratingListing=async(req,res)=>{
  try {
    const{id}=req.params
    const {ratings}=req.body
    const listing=await Listing.findById(id)
    if(!listing){
      return res.json({success:false,message:'Listing is not found'})
    }
   
    listing.rating=Number(ratings)
    listing.save()
    return res.json({success:true,message:'rating is submit'})
    
  } catch (error) {
      console.error(error)
     return res.json({success:false,message:"Server Error!"})
  }
}


/* -------------------------- Search Listing controller ----------------------------- */
const searchListing=async(req,res)=>{
  try {
     const {query} =req.query;
    
      const listing =await Listing.find({$or:[
        { landmark:{$regex:query,$options:'i'}},
        { city:{$regex:query,$options:'i'}},
        { title:{$regex:query,$options:'i'}},
      ],})
     return res.json({success:true,listing})

  } catch (error) {
    console.log(error)
    return res.json({success:false,message:"Server Error!"})
  }
}
export {addListing,allListing,editListing,deleteListing,findListing,ratingListing,searchListing};