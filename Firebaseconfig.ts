// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0tQSu3VwqjLRdE1QW1L4y-2Q-VkHAh68",
  authDomain: "scanngo-c3bf7.firebaseapp.com",
  projectId: "scanngo-c3bf7",
  storageBucket: "scanngo-c3bf7.firebasestorage.app",
  messagingSenderId: "936316225705",
  appId: "1:936316225705:web:ca7c6cab343d735e43c1b8",
  measurementId: "G-SN3STFQ2ZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


const auth = getAuth(app);

const storage = getStorage(app);

export { db, auth, storage };