// Import required Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCbBqjgo1pBZlBIUKPWYmVy-xHT2TGd5M4",
  authDomain: "svasthmaitri-705da.firebaseapp.com",
  databaseURL: "https://svasthmaitri-705da-default-rtdb.firebaseio.com",
  projectId: "svasthmaitri-705da",
  storageBucket: "svasthmaitri-705da.firebasestorage.app",
  messagingSenderId: "748233553999",
  appId: "1:748233553999:web:31b7027b73aa058648123a",
  measurementId: "G-4YDYT9RKQR"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);



// ✅ Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// ✅ Export initialized services
export { app, auth, database, storage };
