// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔁 Reemplaza estos valores con los que obtendrás desde Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB9QuZgYzQSaxR5leRt7uzk_vCkSvcLI7A",
  authDomain: "winepo-admin-d8165.firebaseapp.com",
  projectId: "winepo-admin-d8165",
  storageBucket: "winepo-admin-d8165.firebasestorage.app",
  messagingSenderId: "900480545316",
  appId: "1:900480545316:web:28842f2c1bc5fdc4819eb1"
};

// Inicializa la app
const app = initializeApp(firebaseConfig);

// Exporta la base de datos (Firestore)
const db = getFirestore(app);

export default db;
