import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";

// Cấu hình Firebase (thay bằng cấu hình của bạn)
const firebaseConfig = {
  apiKey: "AIzaSyByXul5rkYt10n2aQs8giAKqBIZyrEST80",
  authDomain: "react-authen-48b00.firebaseapp.com",
  projectId: "react-authen-48b00",
  storageBucket: "react-authen-48b00.firebasestorage.app",
  messagingSenderId: "228307546210",
  appId: "1:228307546210:web:5b83e9231fd6e46d0de13b",
  measurementId: "G-ZMBHVFHBB0",
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
