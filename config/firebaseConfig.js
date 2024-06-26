// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_kyZGWauWMgmp-6mNU9Sw57rqfz4UY2A",
  authDomain: "deals-59d6a.firebaseapp.com",
  projectId: "deals-59d6a",
  storageBucket: "deals-59d6a.appspot.com",
  messagingSenderId: "98769361290",
  appId: "1:98769361290:web:cb4495b79f93d6b02f5073",
  measurementId: "G-RN6D1Z2XT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);