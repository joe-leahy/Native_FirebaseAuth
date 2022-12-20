import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCByzUOWxAXe6YhTgeE0XzQ9B3E32vPlW4",
  authDomain: "fir-auth-47693.firebaseapp.com",
  projectId: "fir-auth-47693",
  storageBucket: "fir-auth-47693.appspot.com",
  messagingSenderId: "768560735493",
  appId: "1:768560735493:web:3eca6aa40dd0cbfe67836c"
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
