import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOIcftRCpl7k1qRTwIqEGDfN1ZEgDfU9g",
    authDomain: "clone-tutorial-video.firebaseapp.com",
    projectId: "clone-tutorial-video",
    storageBucket: "clone-tutorial-video.appspot.com",
    messagingSenderId: "654986324527",
    appId: "1:654986324527:web:d04eea50544c94e92e74da",
    measurementId: "G-DZBC7856S3"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);