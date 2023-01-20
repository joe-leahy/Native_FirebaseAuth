import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpZy4LXy67m8gtr_0KwOeAgKXk1Y_FfEI",
  authDomain: "weather-af400.firebaseapp.com",
  projectId: "weather-af400",
  storageBucket: "weather-af400.appspot.com",
  messagingSenderId: "346397525517",
  appId: "1:346397525517:web:0c94b6d4a7af3d3d58b744"
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
