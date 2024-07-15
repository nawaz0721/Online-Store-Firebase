// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { 
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { 
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,

} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { 
  getStorage, 
  ref,
  uploadBytes,
  getDownloadURL,
  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5C0X7jVqkR3jEoCU1qkABh8DXt9ANt7o",
  authDomain: "online-store-2f5f1.firebaseapp.com",
  projectId: "online-store-2f5f1",
  storageBucket: "online-store-2f5f1.appspot.com",
  messagingSenderId: "979390021505",
  appId: "1:979390021505:web:30d0a8c49d3a01022bb280",
  measurementId: "G-W5YZ10XC1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export{
    auth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    db,
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    storage,
    getStorage, 
    ref,
    uploadBytes,
    getDownloadURL,
    query,
    where,
  updateDoc,
  arrayUnion,
  arrayRemove,
}