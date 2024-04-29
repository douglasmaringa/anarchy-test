// RightComponent.js
import React from 'react';

const RightComponent = () => {
  // Dummy chat messages (replace it with actual data)
  const chatMessages = [
    { id: 1, sender: true, message: "Hello, how are you?" },
    { id: 2, sender: false, message: "Hi! I'm good, thanks." },
    // Add more chat messages as needed
  ];

  return (
    <div className="flex-auto h-screen bg-gray-100 flex flex-col justify-between">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Chatroom Content</h2>
        {/* Render chat messages */}
        {chatMessages.map(message => (
          <div
            key={message.id}
            className={`mb-2 ${message.sender ? 'text-blue-600 self-end' : 'text-yellow-600'}`}
          >
            {message.message}
          </div>
        ))}
      </div>
      <div className="p-4 bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
        />
        <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md mt-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default RightComponent;
