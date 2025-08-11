import React, { useContext, useState } from 'react';
import { authDataContext } from '../context/AuthContext.jsx';
import { GiConfirmed } from "react-icons/gi";
import Star from '../component/Star.jsx';
import axios from 'axios';
import { assets } from '../assets/assets.js';
import { toast } from 'react-toastify';

const ConfirmBooking = () => {
  const {bookingData,backendUrl,getCurrentUser,getAllListing,navigate,token} = useContext(authDataContext);

  const [star, setStar] = useState(null);

  const handleStar = (value) => {
    setStar(value);
   
  };

  const handleRating = async (id) => {
    try {
      const response = await axios.post(backendUrl + `/api/listing/submitRating/${id}`,{ ratings: star },{ withCredentials: true,headers:{token} });
      await getCurrentUser(token);
      await getAllListing();
      if(response.data.success){
        toast.success("Awesome! Your rating has been recorded. We appreciate your time!")
        navigate('/')
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-sky-100 px-4 py-20 gap-10 relative">
      
       <div onClick={()=>navigate('/viewcard')} className=" absolute w-12 h-12 left-6 top-6 text-sky-700 flex justify-center items-center cursor-pointer rounded-full bg-white hover:bg-sky-50 ">      
          <img src={assets.dropdown} alt="Back" className="rotate-180 w-4" />         
      </div>
              {/* back to home button */}
      <div onClick={()=>navigate('/')} className=" absolute px-4 py-2 border border-sky-300 right-2 top-6 text-sky-700 flex justify-center items-center cursor-pointer rounded-full bg-white hover:bg-sky-50 ">
          Go To Home  
      </div>
      {/* Booking Confirmed Card */}
      <div className="w-full md:w-[60%] lg:w-[40%] bg-white rounded-xl shadow-md flex flex-col items-center px-6 py-8 gap-4">
        <GiConfirmed className="text-green-500 text-6xl" />
        <h2 className="text-2xl font-semibold text-gray-800">Booking Confirmed</h2>

        <div className="w-full space-y-4 text-sm md:text-base text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <p>Booking ID:</p>
            <p className="font-medium break-words text-right">{bookingData._id}</p>
          </div>
          <div className="flex justify-between border-b pb-2">
            <p>Owner Email:</p>
            <p className="font-medium break-words text-right">{bookingData.host?.email}</p>
          </div>
          <div className="flex justify-between">
            <p>Total Rent:</p>
            <p className="font-medium text-right">₹{bookingData.totalRent}</p>
          </div>
        </div>
      </div>

      {/* Rating Card */}
      <div className="w-full md:w-[60%] lg:w-[40%] bg-white rounded-xl shadow-md flex flex-col items-center px-6 py-8 gap-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {star ? `You rated: ${star} / 5` : 'Rate Your Experience'}
        </h3>

        <Star onRate={handleStar} />

        <button
          disabled={!star}
          onClick={() => handleRating(bookingData.listing)}
          className={`${
            star ? 'bg-red-500 hover:bg-red-600' : 'bg-red-300 cursor-not-allowed'
          } text-white font-medium px-8 py-3 rounded-lg transition-all duration-300`}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default ConfirmBooking;
