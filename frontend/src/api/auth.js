import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';

export async function registerWithEmail({ email, password, name, role }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, 'users', cred.user.uid), {
    uid: cred.user.uid,
    name,
    email,
    role,
    createdAt: new Date().toISOString()
  });
  return cred.user;
}

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export function setupRecaptcha(containerId) {
  return new RecaptchaVerifier(auth, containerId, { size: 'invisible' });
}

export const loginWithPhone = (phone, verifier) =>
  signInWithPhoneNumber(auth, phone, verifier);