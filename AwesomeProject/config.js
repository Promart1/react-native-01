// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzQH6h8nl-Z5QjJmmfVmp3Vg0A1Wx5LCE",
  authDomain: "myappreactnative1.firebaseapp.com",
  projectId: "myappreactnative1",
  storageBucket: "myappreactnative1.appspot.com",
  messagingSenderId: "199522185511",
  appId: "1:199522185511:web:323b0b77ad9c9a93173902",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
