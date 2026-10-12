import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, tokenStore } from './api';
const Ctx = createContext();
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => {
    try { if (await tokenStore.get()) setUser(await api.me()); } catch { await tokenStore.clear(); }
    setLoading(false); })(); }, []);
  const finish = async ({ token, user }) => { await tokenStore.set(token); setUser(user); };
  const value = { user, setUser, loading,
    login: async (b) => finish(await api.login(b)),
    register: async (b) => finish(await api.register(b)),
    logout: async () => { await tokenStore.clear(); setUser(null); } };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
