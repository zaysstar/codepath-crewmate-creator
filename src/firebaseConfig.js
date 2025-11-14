// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-3m_ZSeSDXFjYldzKvK4VdZsYQAc6jTQ",
  authDomain: "codepath-crewmatebuilder.firebaseapp.com",
  projectId: "codepath-crewmatebuilder",
  storageBucket: "codepath-crewmatebuilder.firebasestorage.app",
  messagingSenderId: "64154322934",
  appId: "1:64154322934:web:4eff09d95da1d7ebab69d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firestore database instance
// You'll import this in your pages to talk to the database
export const db = getFirestore(app);