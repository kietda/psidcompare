// ref: https://www.youtube.com/watch?v=P-XNZdKQUR0
// ref: https://www.youtube.com/watch?v=v0TKYSkZ2tI
// ref: https://firebase.google.com/docs/database/web/start#web-version-9
// must run: npm install firebase
// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const config = {
  apiKey: "",
  authDomain: "firebaseapp.com",
  databaseURL: "",
  projectId: "virtium-stocks",
  storageBucket: "virtium-stocks.appspot.com",
  messagingSenderId: "",
  appId: "1:179104008428:web:",
};
// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
//   databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com`,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

// };

// function initFirebase() {
//   if (!firebase.apps.length) {
//     firebase.initializeApp(config);
//   }
// }

// initFirebase();

const appFirebase = initializeApp(config);

export { appFirebase };
