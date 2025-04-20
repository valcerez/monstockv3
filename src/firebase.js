// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCVNDY_joWsabUd9uSDkwghZ4_mxqrYf0",
  authDomain: "monstockv3.firebaseapp.com",
  projectId: "monstockv3",
  storageBucket: "monstockv3.firebasestorage.app",
  messagingSenderId: "664172161236",
  appId: "1:664172161236:web:638826595e302344583341",
  measurementId: "G-KEVRHVPPSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);