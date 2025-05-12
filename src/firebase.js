// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDkjuSa7ejyiBe_HXpKAa5c_wha1jP5aMg",
    authDomain: "task-manager-dca88.firebaseapp.com",
    projectId: "task-manager-dca88",
    storageBucket: "task-manager-dca88.firebasestorage.app",
    messagingSenderId: "1067146481363",
    appId: "1:1067146481363:web:435bda68d0a127b3958e26"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };