import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPYHPxCpHw0sLa8GtnwWMCxyt3C2g7c5w",
  authDomain: "crud-nextjs-firebase-f21a0.firebaseapp.com",
  projectId: "crud-nextjs-firebase-f21a0",
  storageBucket: "crud-nextjs-firebase-f21a0.appspot.com",
  messagingSenderId: "816045983623",
  appId: "1:816045983623:web:8387d1fa7090d9b819b522",
  databaseURL: "https://crud-nextjs-firebase-f21a0-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
