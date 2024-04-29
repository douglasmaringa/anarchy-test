import React, { useState, useEffect, useRef } from 'react';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Import Firebase app instance
import moment from 'moment';
import { getAuth } from 'firebase/auth';
import responses from './responses';

const RightComponent = ({ selectedChatroom }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const messagesContainerRef = useRef(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!selectedChatroom) {
          return;
        }

        const q = query(collection(db, 'messages'), where('chatroomId', '==', selectedChatroom));
        const unsubscribe = onSnapshot(q, snapshot => {
          const messagesData = [];
          snapshot.forEach(doc => {
            messagesData.push({ id: doc.id, ...doc.data() });
          });
          // Sort messages by oldest first
          messagesData.sort((a, b) => a.timestamp - b.timestamp);
          setChatMessages(messagesData);
          setLoading(false);
          // Scroll to the bottom
          scrollToBottom();
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching messages:', error.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedChatroom]);

  const handleNewMessage = async () => {
    try {
      setMessage('');
      // Scroll to the bottom after sending a message
      scrollToBottom();
      await addDoc(collection(db, 'messages'), {
        chatroomId: selectedChatroom,
        message: message,
        timestamp: new Date(),
        sender: auth.currentUser.uid, // Set sender as user's UID
      });

      // Simulate a response from a fake user
      sendFakeResponse();
    } catch (error) {
      console.error('Error creating message:', error.message);
    }
  };

  // Function to generate a random response
const sendFakeResponse = async () => {
  const randomIndex = Math.floor(Math.random() * responses.length);
  const responseMessage = responses[randomIndex];

  try {
    // Add the fake response to the chat
    await addDoc(collection(db, 'messages'), {
      chatroomId: selectedChatroom,
      message: responseMessage,
      timestamp: new Date(),
      sender: 'bot', // Set sender as 'bot'
    });

    // Scroll to the bottom after adding the bot's message
    scrollToBottom();
  } catch (error) {
    console.error('Error sending fake response:', error.message);
  }
};


  // Define a function to format the timestamp as "time ago"
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return moment(date).fromNow();
  };

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="flex-auto h-screen bg-gray-100 flex flex-col">
      <div className="p-4 flex-auto overflow-y-auto" ref={messagesContainerRef}>
        {
          selectedChatroom && !loading && <h2 className="text-lg font-semibold mb-4">Chatroom: {selectedChatroom}</h2>
        }
        {
          !selectedChatroom &&  <p className='text-center text-xl'>No chatroom selected. Select a chatroom to start chatting.</p>
        }

        {
          selectedChatroom && chatMessages.length === 0 && !loading && <p>No messages yet. Start the conversation!</p>
        }
        {
          selectedChatroom && loading && <p>Loading messages...</p>
        }
        {chatMessages.map(message => (
          <div
            key={message.id}
            className={`mb-2 max-w-xs ${message.sender === auth.currentUser.uid ? 'self-end bg-blue-500 text-white' : 'ml-auto bg-yellow-200 text-gray-800'}`}
            style={{ borderRadius: '10px' }}
          >
            <div className="p-2">{message.sender === "bot" && "Bot - "}{message.message}</div>
            <div className="text-xs text-gray-900 text-right px-2">{formatTimestamp(message.timestamp)}</div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
        />
        <button onClick={handleNewMessage} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md mt-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default RightComponent;
