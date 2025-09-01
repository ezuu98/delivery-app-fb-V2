import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../lib/firebase.js';
import { onAuthStateChanged, signOut, getIdToken } from 'firebase/auth';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined=loading, null=logged out

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null));
    return () => unsub();
  }, []);

  const value = useMemo(() => ({
    user,
    loading: user === undefined,
    signOut: () => signOut(auth),
    getToken: async () => (auth.currentUser ? getIdToken(auth.currentUser) : null)
  }), [user]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() { return useContext(AuthCtx); }
