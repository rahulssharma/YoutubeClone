import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDSyJsRSo7Vq8AFETtUhMJ-2E9Qsc4yo3Y",
  authDomain: "video-d8701.firebaseapp.com",
  projectId: "video-d8701",
  storageBucket: "video-d8701.appspot.com",
  messagingSenderId: "221821947009",
  appId: "1:221821947009:web:242eb581d61d044d199180"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const provider=new GoogleAuthProvider();

export default app;