import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';

export async function registerWithEmail({ email, password, name, role }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  
  // 1. Send Verification Email
  await sendEmailVerification(cred.user);
  
  // 2. Save to Firestore
  await setDoc(doc(db, 'users', cred.user.uid), {
    uid: cred.user.uid,
    name,
    email,
    role,
    emailVerified: false,
    createdAt: new Date().toISOString(),
  });
  return cred.user;
}

export const loginWithEmail = async (email, password) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const loginWithGoogle = async () => {
  const cred = await signInWithPopup(auth, googleProvider);
  return cred.user;
};

// --- MISSING FUNCTIONS ADDED BACK BELOW ---

export function setupRecaptcha(containerId) {
  return new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
}

export const loginWithPhone = (phone, verifier) => {
  return signInWithPhoneNumber(auth, phone, verifier);
};