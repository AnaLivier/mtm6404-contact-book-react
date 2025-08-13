// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvO8BlzybbowEAsdjFQiofsKlbtt32u8I",
  authDomain: "contactbook-6a9f0.firebaseapp.com",
  projectId: "contactbook-6a9f0",
  storageBucket: "contactbook-6a9f0.firebasestorage.app",
  messagingSenderId: "153542100936",
  appId: "1:153542100936:web:36be69f9a251c629cb22fd",
  measurementId: "G-DN58N3KENK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Export the database so other files can use it
export default db;