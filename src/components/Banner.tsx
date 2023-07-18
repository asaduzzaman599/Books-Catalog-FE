import React from 'react';
import banner from '@/assets/images/banner.jpg';

const Banner = () => {
  return (
    <div className="bg-gray-200 py-8">
    <div className="max-w-screen-xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
        <img src={banner} alt="Book Banner" className="w-full h-72 z-10" />
        <div className="p-6 absolute h-full w-full z-20 top-0 left-0 bg-black opacity-50 z-20">
        
        </div>
        <div className="p-6 absolute h-full w-full z-20 top-0 left-0 text-white">
          <div className='w-1/4'>
          <p className="text-gray-100 font-semibold text-xl italic">"Books are a uniquely portable magic."</p>
          <p className="text-gray-200 font-light text-xl italic text-right">- Stephen King</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Banner;