import React, { useContext } from 'react';
import { assets } from '../assets/assets.js';
import { authDataContext } from '../context/AuthContext.jsx';

const About = () => {
  const {navigate}=useContext(authDataContext)
  
  return (
    <div className="min-h-screen w-full bg-sky-100 text-gray-800 relative">
      <div onClick={()=>navigate('/')} className=" absolute  left-10 top-6 text-sky-700 flex justify-center items-center cursor-pointer  ">
          <img src={assets.zayro} alt="Back" className="w-20 h-10 " />
      </div>
             {/* back to home button */}
      <div onClick={()=>navigate('/')} className=" absolute px-4 py-2 border border-sky-300 right-2 top-6 text-sky-700 flex justify-center items-center cursor-pointer rounded-full bg-white hover:bg-sky-50 ">
          Go To Home  
      </div>
      {/* 🌤️ Hero Section */}
      <div className="h-[60vh]  flex items-center justify-center bg-sky-200 shadow-inner">
        <div className="bg-white bg-opacity-95 p-8 rounded-xl text-center w-[90%] max-w-2xl shadow-md">
          <h1 className="text-5xl font-bold mb-4 text-sky-700 text-nowrap">About Zayro</h1>
          <p className="text-lg">
            Discover the story behind our platform and what makes us unique in connecting hosts and travelers.
          </p>
        </div>
      </div>

      {/* 🧾 About Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">

        {/* 📸 Image Side */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.about}
            alt="StaySpot platform"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* 📄 Text Side */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-4 text-sky-700">Who We Are</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to <strong>Zayro</strong> — your trusted platform for booking unique stays across the country.
            Our mission is to help travelers find cozy, comfortable, and affordable places to stay,
            while also giving hosts a way to share their spaces with the world.
          </p>
          <p className="text-gray-700 text-lg mt-4 leading-relaxed">
            Built with the <strong>MERN stack</strong> and powered by modern technologies, Zayro aims to deliver a
            seamless and secure experience whether you're hosting or traveling.
          </p>
        </div>
      </div>

      {/* 📣 Call to Action Footer */}
      <div className="bg-sky-200 py-10 text-center">
        <h3 className="text-2xl font-semibold text-sky-800 mb-2">Ready to list your space or book your next stay?</h3>
        <p className="text-gray-700">Join thousands of users on Zayro and enjoy hassle-free hosting and traveling.</p>
      </div>
    </div>
  );
};

export default About;
