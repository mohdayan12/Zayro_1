import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const AddList = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const { backendUrl, navigate, setAddListing,addListing,token} = useContext(authDataContext);


  const handleAddListing = async (e) => {
    e.preventDefault();
    setAddListing(true)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('landmark', landmark);
    formData.append('city', city);
    if (image1) formData.append('image1', image1);
    if (image2) formData.append('image2', image2);
    if (image3) formData.append('image3', image3);
    if (image4) formData.append('image4', image4);

    try {
      const response = await axios.post(backendUrl + '/api/listing/add',formData,{ withCredentials: true, headers:{token}});
      if (response.data.success) {
        setCity('');
        setDescription('');
        setLandmark('');
        setPrice('');
        setTitle('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        toast.success('Listing added successfully!');
        setAddListing(false)
        navigate('/')
      } else {
        toast.error(response.data.message);
        setAddListing(false)
      }
    } catch (error) {
      toast.error(error.message);
      setAddListing(false)
    }
  };

  return (
    <div className="w-full min-h-screen bg-sky-100 flex justify-center py-10 relative">
      <div className="w-[90%] max-w-3xl bg-white p-6 my-10  rounded-xl shadow-md">
        {/* Back Button */}
         <div onClick={()=>navigate('/')} className=" absolute px-4 py-2 border border-sky-300 right-2 top-6 text-sky-700 flex justify-center items-center cursor-pointer rounded-full bg-white hover:bg-sky-50 ">
          Go To Home  
        </div>

        {/* Form */}
        <form onSubmit={handleAddListing} className="space-y-6">
          {/* Image Upload Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Upload Images</h2>
            <div className='flex flex-wrap gap-3'>
                    <label htmlFor='image1' className="cursor-pointer">
                      <img className='w-32 h-24 object-cover rounded-lg border' src={!image1?assets.upload:URL.createObjectURL(image1)} alt="cccc" />
                      <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
                     </label>
                    <label htmlFor='image2' className="cursor-pointer">
                       <img className='w-32 h-24 object-cover rounded-lg border ' src={!image2?assets.upload:URL.createObjectURL(image2)} alt='' />
                       <input onChange={(e)=>setImage2(e.target.files[0])} type='file' id="image2" hidden />  
                    </label>
                     <label htmlFor='image3' className="cursor-pointer">
                       <img className='w-32 h-24 object-cover rounded-lg border' src={!image3?assets.upload:URL.createObjectURL(image3)} alt='' />
                       <input onChange={(e)=>setImage3(e.target.files[0])} type='file' id="image3" hidden />  
                    </label>
                     <label htmlFor='image4' className="cursor-pointer">
                       <img className='w-32 h-24 object-cover rounded-lg border' src={!image4?assets.upload:URL.createObjectURL(image4)} alt='' />
                       <input onChange={(e)=>setImage4(e.target.files[0])} type='file' id="image4" hidden />  
                    </label>
                  </div>
          </div>

          {/* Text Fields */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Listing title"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Write something about the place..."
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price (per day)</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="₹ /day"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Landmark</label>
            <input
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              type="text"
              placeholder="Landmark"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="City"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {addListing?"Adding Listing...":"Add Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddList;
