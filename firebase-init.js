import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbr_qI4eedyWERxATKfYZsxCM3R0EAjoE",
  authDomain: "dota2-casesimulator.firebaseapp.com",
  projectId: "dota2-casesimulator",
  storageBucket: "dota2-casesimulator.appspot.com",
  messagingSenderId: "338322335365",
  appId: "1:338322335365:web:dbfe07ae849a9341cb2bec",
  measurementId: "G-JS43YZJPGN"
};

let app;
if (!window.firebaseApp) {
  app = initializeApp(firebaseConfig);
  window.firebaseApp = app;
} else {
  app = window.firebaseApp;
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };