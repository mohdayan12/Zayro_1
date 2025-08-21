// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zayro-705c7.firebaseapp.com",
  projectId: "zayro-705c7",
  storageBucket: "zayro-705c7.firebasestorage.app",
  messagingSenderId: "885275641348",
  appId: "1:885275641348:web:f9c4a036b982ec18d55751"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
export {auth,provider}