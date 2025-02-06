// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAWS83pmNe24QVHEzic5NVdEcp6ALMAxAw",
  authDomain: "boost-web-7bdee.firebaseapp.com",
  projectId: "boost-web-7bdee",
  storageBucket: "boost-web-7bdee.firebasestorage.app",
  messagingSenderId: "505760140190",
  appId: "1:505760140190:web:4ef77d785574cef8e4648f",
  measurementId: "G-10KCBG8PTD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);