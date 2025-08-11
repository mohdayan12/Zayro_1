import React, { useContext, useEffect, useState } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewCard = () => {
  const { cardDetails, navigate, userData, backendUrl, getCurrentUser, getAllListing, token } = useContext(authDataContext);
  const [img, setImage] = useState(null);
  const [sameUser, setSameUser] = useState(false);
  const [popUp,setPopUp]=useState(false)

  const deleteListing = async () => {
    
    try {
      const response = await axios.post(backendUrl +`/api/listing/delete`,{ listingId: cardDetails._id },{ withCredentials: true, headers:{token} });
      console.log(response);
      if(response.data.success){
        await getAllListing()
        await getCurrentUser(token)
        toast.success("Listing has Delete")
         navigate('/');
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cardDetails) {
      navigate('/');
    } else {
      setImage(cardDetails.image1);
      setSameUser(cardDetails.host === userData?.user?._id);
    }
  }, [cardDetails, navigate, userData]);

  if (!cardDetails) return null;

  return (
   <div className='w-full min-h-screen bg-sky-100 relative'> 
    <div className="w-[90%] lg:w-[80%] min-h-screen mx-auto my-20 py-6 bg-white shadow-md rounded-xl ">
      {/* 🔙 Back Button */}
      <div
        onClick={() => navigate('/')}
        className="bg-white px-4 py-2 right-2  text-sky-700 border border-sky-300 top-6 rounded-full flex justify-center items-center cursor-pointer   hover:bg-sky-50 absolute"
      >
        Go to Home
        
      </div>

      {/* 🏠 Title */}
      <h1 className="text-2xl font-bold text-sky-700 px-6 mb-6">
        {cardDetails.title.toUpperCase()}
      </h1>

      {/* 🖼️ Image Gallery */}
      <div className="flex flex-col md:flex-row gap-6 px-6">
        <div className="md:w-1/2 w-full">
          <img src={img} alt="Main" className="rounded-xl w-full h-[350px] object-cover shadow" />
        </div>

        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          {[cardDetails.image1, cardDetails.image2, cardDetails.image3, cardDetails.image4].map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Thumb-${idx}`}
              onClick={() => setImage(image)}
              className={`rounded-lg cursor-pointer hover:opacity-80 border-2 ${
                img === image ? 'border-sky-400' : 'border-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 📄 Description */}
      <div className="mt-10 px-6 space-y-3 text-gray-700">
        <p className="text-[16px]">{cardDetails.description.toUpperCase()}</p>
        <p className="text-lg font-semibold">₹ {cardDetails.price}/day</p>
        <p className="text-sm">📍 {cardDetails.landmark}, {cardDetails.city}</p>
      </div>

      {/* 🎯 Action Buttons */}
      <div className="mt-8 px-6">
        {sameUser ? (
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/editlist/${cardDetails._id}`)}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 tracking-wide cursor-pointer rounded-lg font-semibold"
            >
              Edit Listing
            </button>
            <button
              onClick={()=>setPopUp(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg tracking-wide cursor-pointer font-semibold"
            >
              Delete Listing
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate(`/booking/${cardDetails._id}`)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 tracking-wide cursor-pointer rounded-lg font-semibold"
          >
            Reserve
          </button>
        )}
      </div>

     {/* ❗ Delete Confirmation Modal - only show when needed */}
{popUp && (
  <div className="fixed inset-0 backdrop-blur-[2px]  flex items-center justify-center z-50">
    <div className="w-[90%] max-w-md bg-white rounded-xl shadow-xl p-6">
      <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
        Are you sure you want to delete this listing?
      </h2>

      <div className="flex justify-center gap-5 mt-4">
        <button
          onClick={() => { deleteListing(); setPopUp(false); }}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium"
        >
          Yes
        </button>
        <button
          onClick={() => setPopUp(false)}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          No
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  </div>
  );
};

export default ViewCard;
