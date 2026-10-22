import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut as fbSignOut
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        try {
          const snap = await getDoc(doc(db, 'users', fbUser.uid));
          setRole(snap.exists() ? snap.data().role : null);
        } catch {
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const logout = () => fbSignOut(auth);

  return (
    <AuthContext.Provider value={{ user, role, setRole, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);