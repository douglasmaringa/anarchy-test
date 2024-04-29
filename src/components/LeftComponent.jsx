import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';

const LeftComponent = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  // Dummy data for chats (replace it with actual data)
  const chats = [
    { id: 1, name: 'Chat 1' },
    { id: 2, name: 'Chat 2' },
    { id: 3, name: 'Chat 3' },
    // Add more chat objects as needed
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex-none w-1/6 h-screen bg-gray-200 flex flex-col">
      <h2 className="text-lg font-semibold p-4">All Chats</h2>
      <ul className="overflow-y-auto flex-1">
        {chats.map(chat => (
          <li key={chat.id} className="px-4 py-2 hover:bg-gray-300 cursor-pointer">
            {chat.name}
          </li>
        ))}
      </ul>
      {/* Logout Button */}
      <button onClick={handleLogout} className="w-full bg-gray-500 text-white font-semibold py-2">
        Logout
      </button>
    </div>
  );
};

export default LeftComponent;
