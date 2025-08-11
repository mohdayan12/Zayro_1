import Booking from "../models/booking.models.js";
import Listing from "../models/listing.models.js";
import User from '../models/user.models.js'


/* -------------------------- Booking the Listing controller ----------------------------- */
const createBooking=async(req,res)=>{
    try {
      const {id}=req.params
        const {checkIn,checkOut,totalRent}=req.body;
        const listing=await Listing.findById(id)
         if(!listing){
          return res.json({success:false,message:"listing is not found"})
         }
         if(new Date(checkIn)>= new Date(checkOut)){
            return res.json({success:false,message:"Invalid checkIn/checkOut date"})
         }
         if(listing.isBooked){
          return res.json({success:false,message:"listing is already booked"})
         }
          const booking=await Booking.create({
          checkIn,checkOut,totalRent,
          host:listing.host,
          guest:req.userId,
          listing:listing._id
         })
         await booking.populate("host","email")
         const user=await User.findByIdAndUpdate(req.userId,{$push:{booking:listing}})
         if(!user){
          return res.json({success:false,message:'User not found'})
         }
          listing.guest=req.userId
         listing.isBooked=true
         await listing.save()

      
       return res.json({success:true,booking})
      } catch (error) {
        console.log(error)
        return res.json({success:false,message:"Server Error!"})
    }

}


/* -------------------------- Cancel the Booking controller ----------------------------- */
const cancelBooking=async(req,res)=>{
  try {
    const {id}=req.params
    const listing=await Listing.findByIdAndUpdate(id,{isBooked:false})
    const user=await User.findByIdAndUpdate(listing.guest,{$pull:{booking:listing._id}},{new:true})
    if(!user){
      return res.json({success:false,message:'user is not found'})
    }

     return res.json({success:true,message:'booking is delete'})  
  } catch (error) {
    console.log(error)
    return res.json({success:false,message:"Server Error!"})
  }
}
export {createBooking,cancelBooking};