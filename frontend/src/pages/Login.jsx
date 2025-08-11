import React, { useContext, useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authDataContext } from '../context/AuthContext';
import { assets } from '../assets/assets';

const Login = () => {
  const [show, setShow] = useState(false);
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { backendUrl, token, setToken, navigate, getCurrentUser } = useContext(authDataContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Login') {
        const response = await axios.post(backendUrl + '/api/auth/login',{ email, password },{ withCredentials: true });
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          toast.success('user in logged in');
          await getCurrentUser(response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/auth/signup',{ name, email, password },{ withCredentials: true });
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('item',response.data.token)
          toast.success(response.data.message);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 w-full relative ">
       <div onClick={()=>navigate('/')}
         className="absolute top-6 left-6 flex items-center gap-2 bg-white text-sky-700 px-4 py-2 rounded-full shadow hover:bg-sky-50 transition">
           <img src={assets.dropdown} className="w-4 rotate-180" alt="Back" />
    
      </div>
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-lg">
       
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-2">
          {currentState === 'Login' ? 'Welcome Back!' : 'Join Zayro'}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {currentState === 'Login'
            ? 'Please login to your account'
            : 'Create your free account'}
        </p>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          {currentState === 'Signup' && (
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username "
                required
                className="peer p-3 w-full border border-gray-300 rounded-lg focus:outline-sky-500"
              />
             
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email "
              required
              className="peer p-3 w-full border border-gray-300 rounded-lg focus:outline-sky-500"
            />
          
          </div>

          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password "
              required
              className="peer p-3 w-full border border-gray-300 rounded-lg focus:outline-sky-500"
            />
           
            <div className="absolute right-4 top-4 text-xl cursor-pointer text-gray-500">
              {show ? (
                <IoEyeOffOutline onClick={() => setShow(false)} />
              ) : (
                <IoEyeOutline onClick={() => setShow(true)} />
              )}
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <Link to="/forget-password" className="text-sky-600 hover:underline">
              Forgot password?
            </Link>
            <span
              className="cursor-pointer text-sky-600 hover:underline"
              onClick={() =>
                setCurrentState(currentState === 'Login' ? 'Signup' : 'Login')
              }
            >
              {currentState === 'Login' ? 'Create Account' : 'Login Instead'}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
          >
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
