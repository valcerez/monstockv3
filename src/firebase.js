import { initializeApp }  from "firebase/app";
import { getFirestore }   from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCVNDY_joWsabUd9uSDkwghZ4_mxqrYf0",
  authDomain: "monstockv3.firebaseapp.com",
  projectId: "monstockv3",
  storageBucket: "monstockv3.firebasestorage.app",
  messagingSenderId: "664172161236",
  appId: "1:664172161236:web:638826595e302344583341",
  measurementId: "G-KEVRHVPPSY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);