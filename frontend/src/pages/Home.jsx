import React from 'react'
import Navbar from '../component/Navbar'
import Footer from "../component/Footer"
import AllListing from '../component/AllListing'

const Home = () => {
  return (
    <div className=' w-full min-h-screen bg-sky-100    '>
      <Navbar />
      <AllListing />
      <Footer />
    </div>
  )
}

export default Home
