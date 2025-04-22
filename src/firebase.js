// src/firebase.js
import { initializeApp }       from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

// Récupère bien ta config depuis Firebase Console > Project settings > Your apps
const firebaseConfig = {
  apiKey:            "AIzaSyCCVNDY_joWsabUd9uSDkwghZ4_mxqrYf0",
  authDomain:        "monstockv3.firebaseapp.com",
  projectId:         "monstockv3",
  storageBucket:     "monstockv3.firebasestorage.app",
  messagingSenderId: "664172161236",
  appId:             "1:664172161236:web:638826595e302344583341"
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);

// Initialise Firestore en désactivant le WebChannel (stream) et en forçant le long‑polling
export const db = initializeFirestore(app, {
  // force le long‑polling au lieu du WebChannel
  experimentalForceLongPolling: true,
  // désactive les FetchStreams qui peuvent réactiver WebChannel en prod
  useFetchStreams: false
});
