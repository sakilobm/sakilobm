import * as firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBx8bE9dqkj3B9rlEhMS-vJZixkRPlXtSQ",
  authDomain: "sakilobmapp.firebaseapp.com",
  databaseURL: "https://sakilobmapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sakilobmapp",
  storageBucket: "sakilobmapp.appspot.com",
  messagingSenderId: "648948647907",
  appId: "1:648948647907:web:f07375043a0a1d0b68c2d6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
