// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6DhI2P2sThqSmOW9DB3lM36dlRwoSJp4",
  authDomain: "netflix-1e6f3.firebaseapp.com",
  projectId: "netflix-1e6f3",
  storageBucket: "netflix-1e6f3.firebasestorage.app",
  messagingSenderId: "511269788278",
  appId: "1:511269788278:web:24f9a191f6a46e89045d57",
  measurementId: "G-Q30JLVG92D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
