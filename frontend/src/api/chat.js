import { ref, push, set, serverTimestamp, onValue, off, query, limitToLast } from 'firebase/database';
import { rtdb } from '../firebase/config';
import { set as setRtdb } from 'firebase/database';


export function buildChatId(jobId, employerUid, workerUid) {
  return [jobId, employerUid, workerUid].sort().join('_');
}

export async function ensureChat(chatId, members) {
  const chatRef = ref(rtdb, `chats/${chatId}`);
  const membersObj = Object.fromEntries(members.map((uid) => [uid, true]));
  await set(ref(rtdb, `chats/${chatId}/members`), membersObj);
}

export async function sendMessage(chatId, senderUid, text) {
  const msgsRef = ref(rtdb, `chats/${chatId}/messages`);
  const newRef = push(msgsRef);
  await set(newRef, {
    senderUid,
    text,
    createdAt: serverTimestamp()
  });
  // Bump lastMessage for chat list
  await set(ref(rtdb, `chats/${chatId}/lastMessage`), {
    text,
    senderUid,
    at: serverTimestamp()
  });
}

export function subscribeMessages(chatId, callback) {
  const q = query(ref(rtdb, `chats/${chatId}/messages`), limitToLast(100));
  const listener = onValue(q, (snap) => {
    const out = [];
    snap.forEach((child) => out.push({ id: child.key, ...child.val() }));
    callback(out);
  });
  return () => off(q, 'value', listener);
}


export async function indexChatForUser(uid, chatId) {
  await setRtdb(ref(rtdb, `userChats/${uid}/${chatId}`), true);
}