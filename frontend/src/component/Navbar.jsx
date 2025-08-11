import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { authDataContext } from '../context/AuthContext.jsx';


const Navbar = () => {
  const [showList, setShowList] = useState(false);
  const [input, setInput] = useState('');
  const { userData, logout,  navigate, handleSearch } = useContext(authDataContext);
  const menuRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    if (showList) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showList]);

  // Search as user types
  useEffect(() => {
    handleSearch(input);
  }, [input]);

 

  return (
    <nav className="bg-white fixed  w-full z-50 border-b backdrop-blur-2xl   border-gray-300 shadow-sm px-4 md:px-10 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/"
       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img src={assets.zayro} alt="Zayro Logo" className="w-20 md:w-24" />
      </Link>

      {/* Search Bar */}
      <div className="w-[45%] relative  md:flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Start your next trip here..."
          className="w-full h-11 rounded-full border border-gray-300 pl-4 pr-12 focus:outline-sky-500 bg-sky-100"
        />
       
      </div>

      {/* Profile & Menu */}
      <div className="flex items-center gap-4">
        {/* User Icon */}
        {userData ? (
          <div className="bg-sky-700 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl uppercase">
            {userData.user.email?.charAt(0)}
          </div>
        ) : (
          
            <img onClick={()=>navigate('/login')} src={assets.profile} alt="Login" className="w-8 h-8 cursor-pointer" />
          
        )}

        {/* Menu Icon */}
        <div className="relative z-20">
          <img
            src={assets.menu}
            alt="menu"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setShowList(true)}
          />

          {/* Dropdown */}
          <div
            ref={menuRef}
            className={`absolute right-0 top-12 w-40 bg-white shadow-lg border border-gray-200 rounded-lg p-4 transition-all duration-300 ease-in-out ${
              showList ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            {/* Close Icon */}
            <img
              src={assets.cross}
              alt="Close"
              onClick={() => setShowList(false)}
              className="w-5 absolute top-3 right-3 cursor-pointer"
            />

            <hr className="my-6 border-t border-gray-300" />

            {userData ? (
              <div className="flex flex-col gap-3 text-gray-800">
                <span onClick={()=>navigate('/add-list')}>List Your Home</span>
                <span onClick={()=>navigate('/my-listing')}>My Listings</span>
                <span onClick={()=>navigate('/my-booking')}>My Bookings</span>
                <button onClick={()=>logout()} className="text-red-500 text-left">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 text-gray-700">
                <span onClick={()=>navigate('/login')}>login</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
