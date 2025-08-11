import React, {useState,useContext} from 'react';
import { assets } from '../assets/assets.js';
import axios from 'axios';
import {toast} from 'react-toastify'
import {authDataContext} from '../context/AuthContext'
const Contact = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [message,setMessage]=useState("")
  const {backendUrl, navigate}=useContext(authDataContext)

  const sendMessage=async(e)=>{
    e.preventDefault()
    try {
      const response=await axios.post(backendUrl + '/api/user/contact',{name,email,message},{withCredentials:true})
      if(response.data.success){
        setName("")
        setEmail("")
        setMessage("")
        toast.success(response.data.message)
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
     toast.error(error.message);
      console.log(error)
    }
  }
  return (
  
    <div className="min-h-screen w-full bg-sky-100 py-20 px-4 relative">
      <div onClick={()=>navigate('/')} className=" absolute  left-10 top-6 text-sky-700 flex justify-center items-center cursor-pointer  ">
        <img src={assets.zayro} alt="Back" className="w-20 h-10 " />
      </div>
                   {/* back to home button */}
      <div onClick={()=>navigate('/')} className=" absolute px-4 py-2 border border-sky-300 right-2 top-6 text-sky-700 flex justify-center items-center cursor-pointer rounded-full bg-white hover:bg-sky-50 ">
        Go To Home  
      </div>

      {/* 🌟 Centered White Box Heading */}
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md text-center mb-12 md:mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-700">Get in Touch</h1>
        <p className="text-gray-600 mt-2 text-lg">
          We'd love to hear from you — reach out with questions, feedback, or partnership ideas.
        </p>
      </div>

      {/* 📦 Main Content Grid */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 ">

        {/* 🖼️ Image Section */}
        <div className="w-full">
          <img
            src={assets.contact}
            alt="Contact Us"
            className="w-full h-full rounded-xl object-cover shadow-lg"
          />
        </div>

        {/* 📬 Contact Form */}
        <div className="w-full bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-sky-700 mb-6">Send Us a Message</h2>

          <form  onSubmit={sendMessage} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                 value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                placeholder="Type your message here..."
                rows="5"
                 value={message}
                onChange={(e)=>setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
