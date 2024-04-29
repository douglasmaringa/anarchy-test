import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Import Firebase app instance

const LeftComponent = ({selectedChatroom,setSelectedChatroom}) => {
  const [chatrooms, setChatrooms] = useState([]); // State to store chatrooms
  const [loading, setLoading] = useState(true); 
  const [loading2, setLoading2] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        //console.log('User is authenticated:', user.uid)
        try {
          const userId = user.uid;

          const q = query(collection(db, 'chatrooms'), where('createdBy', '==', userId));
          const querySnapshot = await getDocs(q);

          const chatroomsData = [];
          querySnapshot.forEach(doc => {
            chatroomsData.push({ id: doc.id, ...doc.data() });
          });

          setChatrooms(chatroomsData);
        } catch (error) {
          console.error('Error fetching chatrooms:', error.message);
        } finally {
          setLoading(false); // Set loading state to false once chatrooms are fetched
        }
      } else {
        // User is not authenticated, navigate to login page
        navigate('/');
      }
    });

    return () => unsubscribe(); 
  }, [navigate]); 

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleNewChat = async () => {
    setLoading2(true);
    const auth = getAuth();
    try {
      // Get current user information
      const user = auth.currentUser;
      const userId = user.uid;
      const userName = user.displayName;

      const docRef = await addDoc(collection(db, 'chatrooms'), {
        createdBy: userId,
        creatorName: userName,
        createdAt: new Date(),
      });
      setLoading2(false);
      // Optionally, navigate to the newly created chat room
      navigate(`/home`);
    } catch (error) {
      setLoading2(false);
      console.error('Error creating chat room:', error.message);
    }
  };


  if (loading) {
    // Show loading indicator while fetching chatrooms
    return <div>Loading..............................</div>;
  }

  const handleChatroomSelect = chatroomId => {
    setSelectedChatroom(chatroomId);
  };


  return (
    <div className="flex-none w-1/6 h-screen bg-gray-200 flex flex-col">
      <button onClick={handleNewChat} className="w-full bg-green-500 text-white font-semibold py-2">
        {
          loading2 ? 'Creating Chatroom...' : 'New Chatroom'
        }
      </button>
      <ul className="overflow-y-auto flex-1">
        {chatrooms?.map(chatroom => (
          <li key={chatroom.id} className={`${chatroom.id === selectedChatroom ? "bg-gray-300":""} px-4 py-2 hover:bg-gray-300 cursor-pointer`} onClick={() => handleChatroomSelect(chatroom.id)}>
            {chatroom.id}
          </li>
        ))}
      </ul>
      {/* Logout Button */}
      <button onClick={handleLogout} className="w-full bg-gray-500 text-white font-semibold py-2 mt-2">
        Logout
      </button>
    </div>
  );
};

export default LeftComponent;
