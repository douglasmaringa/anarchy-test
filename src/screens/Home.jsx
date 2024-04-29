// Home.js
import React,{useState} from 'react';
import LeftComponent from '../components/LeftComponent';
import RightComponent from '../components/RightComponent';

const Home = () => {
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  return (
    <div className="flex">
      {/* Left Component */}
      <LeftComponent selectedChatroom={selectedChatroom} setSelectedChatroom={setSelectedChatroom}/>

      {/* Right Component */}
      <RightComponent selectedChatroom={selectedChatroom}/>
    </div>
  );
};

export default Home;
