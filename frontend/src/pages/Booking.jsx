import React, { useContext, useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import { FaStar } from "react-icons/fa6";

const Booking = () => {
  const {cardDetails,checkIn,setCheckOut,setCheckIn,checkOut,night,totalPrice,handleBooking} = useContext(authDataContext);

  const [minDate, setMinDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);


if(!cardDetails) return null;
  return (
    <div className="w-full min-h-screen px-4 md:px-10 py-6 bg-sky-100 relative ">
     <div className='my-16'>
      {/* Back Button */}
       <div onClick={()=>navigate('/viewcard')} className=" absolute w-12 h-12 left-6 top-6 text-sky-700 flex justify-center items-center cursor-pointer rounded-full bg-white hover:bg-sky-50 ">       
         <img src={assets.dropdown} alt="Back" className="rotate-180 w-4" />       
      </div>
      {/* back to home button */}
      <div onClick={()=>navigate('/')} className=" absolute px-4 py-2 border border-sky-300 right-2 top-6 text-sky-700 flex justify-center items-center cursor-pointer rounded-full bg-white hover:bg-sky-50 ">
         Go To Home  
      </div>
      {/* Main Content */}
      <div className="flex flex-col-reverse md:flex-row gap-8 justify-center">
        
        {/* Booking Form */}
        <div className="w-full md:w-[40%] bg-white rounded-lg shadow-md p-5">
          <h2 className="text-2xl font-semibold text-center mb-6">Confirm & Book</h2>

          <div className="border-t border-gray-300 pt-4">
            <p className="font-medium mb-4">Your Trip</p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-sm mb-1 font-medium">Check-In</label>
                <input
                  type="date"
                  value={checkIn}
                  min={minDate}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="border px-3 py-2 rounded-lg"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1 font-medium">Check-Out</label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || minDate}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="border px-3 py-2 rounded-lg"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => handleBooking(cardDetails._id)}
            className="mt-6 bg-red-400 hover:bg-red-500 transition text-white w-full py-3 rounded-lg font-medium"
          >
            Book Now
          </button>
        </div>

        {/* Booking Summary */}
        <div className="w-full md:w-[40%] bg-white rounded-lg shadow-md p-5">
          <div className="flex items-center gap-4 mb-5">
            <img src={cardDetails.image1} alt="listing" className="w-24 h-24 rounded-lg object-cover border" />
            <div>
              <p className="font-semibold">{cardDetails.title}</p>
              <p className="text-sm text-gray-600">{cardDetails.landmark}</p>
              <div className="flex items-center gap-1 text-orange-500 mt-1">
                <FaStar />
                <span className="text-base">{cardDetails.rating}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <p className="font-medium mb-3">Booking Summary</p>
            <div className="flex justify-between mb-2 text-sm">
              <span>₹{cardDetails.price} × {night} night(s)</span>
              <span>₹{cardDetails.price * night}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Tax</span>
              <span>₹{(cardDetails.price * 0.07).toFixed(0)}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Service Charges</span>
              <span>₹{(cardDetails.price * 0.08).toFixed(0)}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

export default Booking;
