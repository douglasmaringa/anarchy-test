// Home.js
import React from 'react';
import LeftComponent from '../components/LeftComponent';
import RightComponent from '../components/RightComponent';

const Home = () => {
  return (
    <div className="flex">
      {/* Left Component */}
      <LeftComponent />

      {/* Right Component */}
      <RightComponent />
    </div>
  );
};

export default Home;
