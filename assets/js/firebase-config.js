// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Replace with your actual Firebase project configuration
// You can get this from the Firebase Console -> Project Settings
const firebaseConfig = {
    apiKey: "AIzaSyBCZdp-mfMX8BHu1Wv2BvQVVJVT9E6TT7E",
    authDomain: "verygood-d36c5.firebaseapp.com",
    projectId: "verygood-d36c5",
    storageBucket: "verygood-d36c5.firebasestorage.app",
    messagingSenderId: "789302109242",
    appId: "1:789302109242:web:9c466ca4c5cabba1cdc103",
    measurementId: "G-H6HKSZYN39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
