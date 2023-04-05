// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ250FeQ9tcJfcNxuY0tgZ8I8dob6tMNA",
  authDomain: "is3106-imagestore.firebaseapp.com",
  projectId: "is3106-imagestore",
  storageBucket: "is3106-imagestore.appspot.com",
  messagingSenderId: "397061097174",
  appId: "1:397061097174:web:f06ce2793d663fd4842b77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);