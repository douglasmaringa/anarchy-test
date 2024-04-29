// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyCbM_dmG_U6Xxn_e2bT7qG7gFIdvLOfYN4",
    authDomain: "anarchy-ea3fc.firebaseapp.com",
    projectId: "anarchy-ea3fc",
    storageBucket: "anarchy-ea3fc.appspot.com",
    messagingSenderId: "310083733805",
    appId: "1:310083733805:web:b433a3c7729b34812d6ba4",
    measurementId: "G-83BHVGRJTS"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default firebaseApp;
export {db};
