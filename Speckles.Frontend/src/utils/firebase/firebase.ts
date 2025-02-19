import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNHIFFILPQCrZjXoz833RHATk7R7n2gAo",
  authDomain: "speckles-oskarpetr.firebaseapp.com",
  projectId: "speckles-oskarpetr",
  storageBucket: "speckles-oskarpetr.appspot.com",
  messagingSenderId: "335344075805",
  appId: "1:335344075805:web:fc473feccbb0df44fc32f4",
  measurementId: "G-EJNBBZZQVM",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
