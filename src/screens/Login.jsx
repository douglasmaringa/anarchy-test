import React from 'react';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseApp from '../firebase'; // Import your Firebase config file
import { useNavigate } from 'react-router';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Login = () => {
    const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
     navigate('/home');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log(result.user);
      // You can access user data here, such as result.user.displayName, result.user.email, etc.
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button 
        onClick={handleGoogleLogin} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Login with Google
      </button>
      <button 
        onClick={handleGithubLogin} 
        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;
