import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCGcQGG9HGLrBEtO1ZXxVk9MLn9Ed56zU8",
  authDomain: "chatapp-f4ecd.firebaseapp.com",
  projectId: "chatapp-f4ecd",
  storageBucket: "chatapp-f4ecd.appspot.com",
  messagingSenderId: "215007816669",
  appId: "1:215007816669:web:ba1720dad8767f3d776434",
  databaseURL: "https://chatapp-f4ecd-default-rtdb.firebaseio.com/",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
