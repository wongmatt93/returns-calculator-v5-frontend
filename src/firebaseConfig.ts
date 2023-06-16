import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZgu9oyp2dB2HLfcbCl4agyAQD6D0LkZE",
  authDomain: "premium-option.firebaseapp.com",
  projectId: "premium-option",
  storageBucket: "premium-option.appspot.com",
  messagingSenderId: "164218146838",
  appId: "1:164218146838:web:e28930e7707e8d51796537",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
