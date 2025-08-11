import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const authDataContext = createContext();

const AuthContext = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = '₹';
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [allListing, setAllListing] = useState([]);
  const [cardDetails, setCardDetails] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [night, setNight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingData, setBookingData] = useState();
  const [otpEmail, setOtpEmail] = useState("");
  const [addListing, setAddListing] = useState(false);
  const [editListing, setEditListing] = useState(false);
  
  const [token, setToken] = useState('');


 /* -------------------------- get a token from local storage ----------------------------- */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);


/* -------------------------- stored  a token in  local storage when token in changing ----------------------------- */
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);


/* -------------------------- get current user data ----------------------------- */
  const getCurrentUser = async (tokenParam) => {
    try {
      const response = await axios.get(backendUrl + '/api/user/currentuser',{ withCredentials: true, headers: { token: tokenParam || token } });
      if (response.data.success) {
        setUserData(response.data);
      } else  {
        setUserData(null);
       }
    } catch (error) {
      setUserData(null);
      toast.error(error.message);
      console.log(error);
    }
  };


  /* -------------------------- get all listing ----------------------------- */
  const getAllListing = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/listing/allListing',{},{ withCredentials: true });
      if (response.data.success) {
        setAllListing(response.data.allListing);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  /* -------------------------- view single card ----------------------------- */
  const handleViewCard = async (id) => {
    try {
      const response = await axios.get(backendUrl + `/api/listing/findlistingByid/${id}`,{ withCredentials: true, headers: { token } });
      if (response.data.success) {
        setCardDetails(response.data.listing);
        navigate('/viewcard');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  /* -------------------------- handel booking ----------------------------- */
  const handleBooking = async (id) => {
    try {
      const response = await axios.post(backendUrl + `/api/booking/create/${id}`,{ checkIn, checkOut, totalRent: totalPrice },{ withCredentials: true, headers: { token } });
      if (response.data.success) {
        setBookingData(response.data.booking);
        toast.success("Listing is booked");
        navigate("/confirm-Booking");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setBookingData(null);
      toast.error(error.message);
    }
  };


/* -------------------------- cancel booking ----------------------------- */
  const cancelBooking = async (id) => {
    try {
      const response = await axios.delete(backendUrl + `/api/booking/cancel/${id}`,{ withCredentials: true, headers: { token } });
      if (response.data.success) {
        await getCurrentUser(token);
        await getAllListing();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  /* -------------------------- handel search ----------------------------- */
  const handleSearch = async (data) => {
    if (!data || data.trim() === "") return;
    try {
      const response = await axios.get(backendUrl + `/api/listing/search?query=${data}`);
      if (response.data.success) {
        setAllListing(response.data.listing);
      } else {
        await getAllListing();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  /* -------------------------- night and price calculation ----------------------------- */
  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const n = (outDate - inDate) / (24 * 60 * 60 * 1000);
      setNight(n);
      if (n > 0 && cardDetails?.price) {
        const airBnbCharge = cardDetails.price * (7 / 100);
        const tax = cardDetails.price * (7 / 100);
        setTotalPrice((cardDetails.price * n) + airBnbCharge + tax);
      } else {
        setTotalPrice(0);
      }
    }
  }, [checkIn, checkOut]);


/* -------------------------- run when token are present and listing is changing ----------------------------- */
  useEffect(() => {
     getAllListing();
    if (token) {
      getCurrentUser(token);
      
    }
  }, [token, addListing, editListing]);
  

/* -------------------------- logout  ----------------------------- */
  const logout = () => {
    setToken('');
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const value = {
    backendUrl,
    currency,
    navigate,
    userData, setUserData,
    getCurrentUser,
    getAllListing,
    allListing, setAllListing,
    handleViewCard, setCardDetails, cardDetails,
    checkIn, setCheckIn,
    checkOut, setCheckOut,
    night, setNight,
    totalPrice, setTotalPrice,
    handleBooking,
    cancelBooking,
    bookingData, setBookingData,
    handleSearch,
    otpEmail, setOtpEmail,
    addListing, setAddListing,
    editListing, setEditListing,
    token, setToken,
    logout
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
};

export default AuthContext;
