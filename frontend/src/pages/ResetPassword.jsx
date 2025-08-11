import React, { useEffect, useRef, useState, useContext } from 'react';
import Title from '../component/Title';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets.js';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { authDataContext } from '../context/AuthContext.jsx';

const ResetPassword = () => {
  const newpass = useRef();
  const { backendUrl, navigate, otpEmail } = useContext(authDataContext);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/user/reset-password', { email: otpEmail, newPassword, confirmPassword }, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    newpass.current?.focus();
  }, []);
  useEffect(()=>{
    if(!otpEmail){
      toast.error("Email is not found. Redirecting...");
      navigate("/forget-password");
    }
  },[otpEmail,navigate])

  return (
    <div className="min-h-screen w-full flex items-start sm:items-center justify-center bg-sky-100 px-4 relative ">
      <div onClick={()=>navigate('/forget-password')}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white text-sky-700 px-4 py-2 rounded-full shadow hover:bg-sky-50 transition">
        <img src={assets.dropdown} className="w-4 rotate-180" alt="Back" />
                      
      </div>
      <div onClick={()=>navigate('/login')} className=" absolute px-4 py-2 border border-sky-300 right-2 top-6 text-sky-700 flex justify-center items-center cursor-pointer rounded-full bg-white hover:bg-sky-50 ">
        Go To Login  
      </div>
      <div className="bg-white w-full sm:max-w-md p-6 mt-24 sm:mt-0 rounded-xl shadow-md">
       

        <div className="flex justify-center text-2xl mb-6">
          <Title text1="Reset" text2="Password" />
        </div>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          {/* New Password */}
          <div>
            <label htmlFor="newpassword" className="text-sm text-gray-600 mb-1 block">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newpassword"
                placeholder="New Password"
                ref={newpass}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-3 px-3 pr-10 border border-gray-300 rounded-lg outline-none focus:border-sky-400"
                required
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showNewPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="conpassword" className="text-sm text-gray-600 mb-1 block">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="conpassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-3 px-3 pr-10 border border-gray-300 rounded-lg outline-none focus:border-sky-400"
                required
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 rounded-lg transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
