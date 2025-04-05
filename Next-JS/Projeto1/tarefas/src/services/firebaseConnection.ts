import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcH9eaqTDtdKEGQIDzK-S07XSTKAbkMoI",
  authDomain: "tarefasplus-2b60e.firebaseapp.com",
  projectId: "tarefasplus-2b60e",
  storageBucket: "tarefasplus-2b60e.firebasestorage.app",
  messagingSenderId: "662491948417",
  appId: "1:662491948417:web:add3fe173dc10acc56b480"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };