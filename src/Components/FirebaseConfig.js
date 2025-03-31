import { FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAWS83pmNe24QVHEzic5NVdEcp6ALMAxAw",
  authDomain: "boost-web-7bdee.firebaseapp.com",
  databaseURL: "https://boost-web-7bdee-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "boost-web-7bdee",
  storageBucket: "boost-web-7bdee.firebasestorage.app",
  messagingSenderId: "505760140190",
  appId: "1:505760140190:web:4ef77d785574cef8e4648f",
  measurementId: "G-10KCBG8PTD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new FacebookAuthProvider();

export {auth,provider}