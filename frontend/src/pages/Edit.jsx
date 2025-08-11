import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Edit = () => {
  const { listingid } = useParams();
  const { allListing, backendUrl, navigate, editListing, setEditListing, token } = useContext(authDataContext);

  const [listingData, setListingData] = useState();
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const found = allListing.find(item => item._id === listingid);
    if (found) {
      setListingData(found);
    }
  }, [allListing, listingid]);

  useEffect(() => {
    if (listingData) {
      setPrice(listingData.price);
      setTitle(listingData.title);
      setDescription(listingData.description);
      setCity(listingData.city);
      setLandmark(listingData.landmark);
      setImage1(listingData.image1);
      setImage2(listingData.image2);
      setImage3(listingData.image3);
      setImage4(listingData.image4);
    }
  }, [listingData]);

  const handleEditListing = async (e) => {
    e.preventDefault();
    setEditListing(true)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("city", city);
    formData.append("landmark", landmark);
    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);

    try {
      const response = await axios.post(backendUrl+ `/api/listing/update/${listingid}`,formData,{ withCredentials: true, headers:{token}});
      console.log(response);
      if(response.data.success){
        setEditListing(false)
        toast.success('Listing updated successfully')
        navigate('/')
      }
      else{
        setEditListing(false)
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-sky-100  py-8 relative">
      <div className="w-[90%] max-w-3xl bg-white shadow-md rounded-xl p-6 my-10">
        {/* Back Button */}
        <div onClick={()=>navigate('/viewcard')} className=" absolute w-12 h-12 left-6 top-6 text-sky-700 flex justify-center items-center cursor-pointer rounded-full bg-white hover:bg-sky-50 ">
          
            <img src={assets.dropdown} alt="Back" className="rotate-180 w-4" />
          
        </div>
        {/* back to home button */}
         <div onClick={()=>navigate('/')} className=" absolute px-4 py-2 border border-sky-300 right-2 top-6 text-sky-700 flex justify-center items-center cursor-pointer rounded-full bg-white hover:bg-sky-50 ">
          Go To Home  
        </div>

        {/* Form */}
        <form onSubmit={handleEditListing} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Upload Images</h2>
           <div className='flex flex-wrap gap-3'>
        <label htmlFor='image1' className="cursor-pointer">
          <img className='w-32 h-24 object-cover rounded-lg border' src={!image1?assets.upload: typeof image1 === 'string' ? image1 : URL.createObjectURL(image1)} alt="" />
          <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
         </label>
        <label htmlFor='image2' className="cursor-pointer">
           <img className='w-32 h-24 object-cover rounded-lg border ' src={!image2?assets.upload:typeof image2 === 'string' ? image2 : URL.createObjectURL(image2)} alt='' />
           <input onChange={(e)=>setImage2(e.target.files[0])} type='file' id="image2" hidden />  
        </label>
         <label htmlFor='image3' className="cursor-pointer">
           <img className='w-32 h-24 object-cover rounded-lg border' src={!image3?assets.upload:typeof image3 === 'string' ? image3 : URL.createObjectURL(image3)} alt='' />
           <input onChange={(e)=>setImage3(e.target.files[0])} type='file' id="image3" hidden />  
        </label>
         <label htmlFor='image4' className="cursor-pointer">
           <img className='w-32 h-24 object-cover rounded-lg border' src={!image4?assets.upload:typeof image4 === 'string' ? image4 : URL.createObjectURL(image4)} alt='' />
           <input onChange={(e)=>setImage4(e.target.files[0])} type='file' id="image4" hidden />  
        </label>
      </div>
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title:</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">Price:</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="₹/day"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Landmark:</label>
            <input
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              type="text"
              placeholder="Landmark"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block mb-1 font-medium">City:</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold transition"
          >
           { editListing?"Updating Listing...":"Update Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
