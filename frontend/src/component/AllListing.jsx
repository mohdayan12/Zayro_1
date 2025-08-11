import React, { useContext } from 'react';
import Card from './Card';
import Title from './Title';
import { authDataContext } from '../context/AuthContext';

const AllListing = () => {
  const { allListing } = useContext(authDataContext);
  

  return (
     <div className=" pb-12 pt-24 px-4 md:px-12">
      {/* Section Title */}
      <div className="mb-10">
        <Title text1="All" text2="Listings" />
      </div>

      {/* Card Grid */}
      <div className="flex justify-center flex-wrap gap-10">
        {allListing?.map((item, index) => (
          <Card
            key={index}
            id={item._id}
            title={item.title}
            image1={item.image1}
            image2={item.image2}
            image3={item.image3}
            image4={item.image4}
            price={item.price}
            landmark={item.landmark}
            city={item.city}
            rating={item.rating}
            isBooked={item.isBooked}
            host={item.host}
          />
        ))}
      </div>
    </div>
      
  )
};

export default AllListing;
