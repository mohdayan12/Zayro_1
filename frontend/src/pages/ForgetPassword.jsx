import React, { useContext, useState, useRef, useEffect } from 'react';
import Title from '../component/Title';
import { assets } from '../assets/assets.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext.jsx';

const ForgetPassword = () => {
  const emailRef = useRef();
  const { navigate, backendUrl, setOtpEmail } = useContext(authDataContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    if (!email) return toast.error('Please provide an email.');

    try {
      const response = await axios.post(backendUrl + '/api/user/forget-password',{ email },{ withCredentials: true });

      if (response.data.success) {
        toast.success(response.data.message);
        setOtpEmail(email); // ✅ set email in context
        navigate('/verify-otp');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-sky-100 px-4 flex justify-center items-start sm:items-center relative ">
      <div onClick={()=>navigate('/login')}
      className="absolute top-6 left-6 flex items-center gap-2 bg-white text-sky-700 px-4 py-2 rounded-full shadow hover:bg-sky-50 transition">
          <img src={assets.dropdown} className="w-4 rotate-180" alt="Back" />
          
      </div>
      <div className="bg-white w-full mt-24 sm:mt-0 sm:max-w-md rounded-xl shadow-md p-6">
        {/* Title */}
        <div className="flex justify-center mb-6">
          <Title text1="Forget" text2="Password" />
        </div>

        {/* Form */}
        <form onSubmit={onsubmitHandler} className="flex flex-col gap-5">
          <input
            type="email"
            value={email}
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-sky-200"
            required
          />

          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-lg transition"
          >
            Generate OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
