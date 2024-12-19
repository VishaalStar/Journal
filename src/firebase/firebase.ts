import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9VHsUkBt32HMrv9qSUh3F1Faq-X6orx8",
  authDomain: "myjournal-22151.firebaseapp.com",
  projectId: "myjournal-22151",
  storageBucket: "myjournal-22151.firebasestorage.app",
  messagingSenderId: "680387600580",
  appId: "1:680387600580:web:1611b2d54c5e1fdcc0e991",
  measurementId: "G-WP88S4S0DS", // Replace with your actual app ID from Firebase console
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth object
const provider = new GoogleAuthProvider(); // Initialize Google provider

export { auth, provider, signInWithPopup };
  