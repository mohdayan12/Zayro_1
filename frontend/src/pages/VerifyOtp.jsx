import React, { useEffect, useRef, useState, useContext } from "react";
import Title from "../component/Title";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets.js";
import { authDataContext } from "../context/AuthContext.jsx";

const VerifyOtp = () => {
  const { navigate, backendUrl, otpEmail } = useContext(authDataContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [expired, setExpired] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (!otpEmail) {
      toast.error("Email is not found. Redirecting...");
      navigate("/forget-password");
    }
  }, [otpEmail, navigate]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputsRef.current[index + 1]?.focus();
    if (!value && index > 0) inputsRef.current[index - 1]?.focus();
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) return toast.error("Please enter the full OTP");

    try {
      const res = await axios.post( backendUrl + "/api/user/verify-otp",{ email: otpEmail, otp: enteredOtp },{ withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        setOtp(["", "", "", ""]);
        navigate("/reset-password");
      } else {
        toast.error(res.data.message);
        setOtp(["", "", "", ""]);
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message);
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post(backendUrl + "/api/user/reset-otp",{ email: otpEmail },{ withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        setOtp(["", "", "", ""]);
        setTimeLeft(120);
        setExpired(false);
        inputsRef.current[0]?.focus();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message);
    }
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="flex w-full items-start sm:items-center justify-center min-h-screen px-4 bg-sky-100 relative">
       <div onClick={()=>navigate('/forget-password')}
            className="absolute top-6 left-6 flex items-center gap-2 bg-white text-sky-700 px-4 py-2 rounded-full shadow hover:bg-sky-50 transition">
                <img src={assets.dropdown} className="w-4 rotate-180" alt="Back" />
                
        </div>
        <div onClick={()=>navigate('/login')} className=" absolute px-4 py-2 border border-sky-300 right-2 top-6 text-sky-700 flex justify-center items-center cursor-pointer rounded-full bg-white hover:bg-sky-50 ">
          Go To Login  
        </div>
      <div className="bg-white w-full mt-24 sm:mt-0 sm:max-w-md p-6 rounded-xl shadow-xl">
    
        <div className=" flex justify-center  mb-6">
          <Title text1="Verify" text2="OTP" />
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, i)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:shadow-md focus:shadow-black focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          ))}
        </div>

        { !expired? <p className="text-center text-sm text-gray-500 mb-4">
          Time left: <span className="font-semibold text-sky-500">{formatTime(timeLeft)}</span>
        </p>:null}
{expired ? (
  <button
    onClick={handleResend}
    className="w-full bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-lg transition font-medium"
  >
    Resend OTP
  </button>
) : (
  <button
    onClick={handleSubmit}
    className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg transition font-semibold"
  >
    Verify OTP
  </button>
)}

      </div>
    </div>
  );
};

export default VerifyOtp;
