import React from 'react'
import { assets } from '../assets/assets.js'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext.jsx'

const Footer = () => {
  const {navigate}=useContext(authDataContext)
  return (
    <div className=" pt-12 text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 pb-10">
        {/* Logo & Intro */}
        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <img src={assets.zayro} alt="logo" className="w-24 mb-4" />
          <p className="text-sm leading-relaxed">
            Zayro helps you find the perfect stay for your next adventure.
            Discover unique listings hosted by locals in beautiful locations.
          </p>
        </div>

        {/* Customer Support */}
       <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold text-sky-800 mb-4">Customer Support</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Help Center</li>
            <li className="hover:underline cursor-pointer">Trust & Safety</li>
            <li className="hover:underline cursor-pointer">Cancellation Policies</li>
          </ul>
       </div>


        {/* Quick Links */}
        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-sky-800">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li onClick={()=>{navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' })}} className="hover:underline cursor-pointer">Home</li>
            <li onClick={()=>{navigate('/about'); window.scrollTo({top:0,behavior:'instant'})}} className="hover:underline cursor-pointer">About</li>
            <li onClick={()=>{navigate('/contact'); window.scrollTo({top:0, behavior:'instant'})}} className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-sky-800">Connect with Us</h2>
          <p className="text-sm font-medium mb-1">📧 mohdayanmalik22@gmail.com</p>
          <p className="text-sm font-medium mb-4">📞 +91 8476971464</p>
          <div className="flex gap-4 text-2xl text-sky-800">
            <a href="https://www.instagram.com/_mohd.ayan__" target="_blank" rel="noopener noreferrer">
             <FaInstagram className="hover:text-sky-600 cursor-pointer" />
            </a>
            <a href="https://www.linkedin.com/in/mohd-ayan-273a61282" target="_blank" rel="noopener noreferrer">
             <FaLinkedin className="hover:text-sky-600 cursor-pointer" />
            </a>
             <a href="https://x.com/mohd_ayanmalik?t=3rN5zH4OOwAtxlHOr28-qg&s=09" target="_blank" rel="noopener noreferrer">
             <FaXTwitter className="hover:text-sky-600 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 py-4 text-center font-[450px] text-sm text-gray-600">
        © 2025 Zayro. All rights reserved.
      </div>
    </div>
  )
}

export default Footer
