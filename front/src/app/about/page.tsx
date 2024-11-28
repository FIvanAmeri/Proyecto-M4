import React from 'react';
import AboutPage from './AboutPage';

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-commerce -ml-[180px]">
      <p className="text-center text-2xl text-white -mt-20">¿Quiénes somos?</p>
      <div className="max-w-2xl mx-auto text-center mt-4 bg-opacity-50 bg-gray-800 p-4 rounded">
        <AboutPage />
      </div>
    </div>
  );
};

export default Page;
