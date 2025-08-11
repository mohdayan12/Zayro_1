import React, { useContext, useState } from 'react';
import { authDataContext } from '../context/AuthContext.jsx';
import { FaStar } from "react-icons/fa6";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { toast } from 'react-toastify';

const Card = ({ id, title, image1, image2, image3, image4, price, landmark, city, rating, isBooked, host }) => {
  const { userData, handleViewCard, navigate, cancelBooking} = useContext(authDataContext);
  const [popUp, setPopUp] = useState(false);

  const handleClick = () => {
    if (userData) {
      handleViewCard(id);
    } else {
      navigate('/login');
    }
  };
  const clickCard=()=>{
    if(!isBooked){
      handleClick()
    }
    else{
      toast.info("you can't click the booked listing")
    }
  }

  return (
    <div
      onClick={() =>clickCard()}
      className="bg-white w-[330px] max-w-[90%] h-[440px] shadow-lg rounded-2xl overflow-hidden cursor-pointer relative hover:shadow-2xl transition duration-300"
    >
      {/* Booked Label */}
      {isBooked && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-600 font-semibold px-3 py-1 text-sm rounded-full flex items-center gap-1">
          <GiConfirmed /> Booked
        </div>
      )}

      {/* Cancel Booking Button */}
      {isBooked && userData?.user._id === host && (
        <div
          onClick={(e) => { e.stopPropagation(); setPopUp(prev => !prev); }}
          className="absolute top-12 right-2 bg-red-100 text-red-600 font-semibold px-3 py-1 text-sm rounded-full flex items-center gap-1 hover:bg-red-200"
        >
          <FcCancel /> Cancel
        </div>
      )}

      {/* Cancel Confirmation Popup */}
      {popUp && (
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-white border border-gray-300 shadow-md p-4 rounded-xl z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-center mb-3 text-gray-700 font-medium">Are you sure you want to cancel this booking?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => { cancelBooking(id); setPopUp(false); }}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={() => setPopUp(false)}
              className="bg-sky-600 text-white px-4 py-1 rounded hover:bg-sky-700"
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Horizontal Scroll Image Section - scrollbar hidden */}
      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
        {[image1, image2, image3, image4].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`stay-${i}`}
            className="w-full h-72 rounded-2xl object-cover flex-shrink-0 snap-x "
          />
        ))}
      </div>

      {/* Card Details Section */}
      <div className="p-6 bg-sky-100 flex flex-col gap-2 h-[calc(100%-16rem)]">
        <div className="flex justify-between items-center text-sky-900 font-medium text-base">
          <span className="truncate max-w-[70%]">{landmark.toUpperCase()}</span>
          <span className="flex items-center gap-1 text-orange-500">
            <FaStar /> {rating}
          </span>
        </div>
          <span className="truncate "> {city.toUpperCase()}</span>
        <p className="text-gray-700 text-sm truncate">{title.toUpperCase()}</p>
        <span className="text-sky-800 font-bold text-lg">
          ₹ {price} <span className="text-sm font-normal">/day</span>
        </span>
      </div>
    </div>
  );
};

export default Card;
