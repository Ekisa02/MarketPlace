import client from './client';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function getWorkerProfile(uid) {
  const workerRef = doc(db, 'workers', uid);
  const snap = await getDoc(workerRef);
  return snap.exists() ? snap.data() : {};
}

export async function getWorkerMessages(uid) {
  // Read from Realtime DB or Firestore depending on your chat setup
  // Assuming a simple Firestore 'chats' collection for this example
  const q = query(collection(db, 'chats'), where('members', 'array-contains', uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}