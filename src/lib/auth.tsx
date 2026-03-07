"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { User } from "./mockUsers";
import { getUserByEmail, mockUsers } from "./mockUsers";

const STORAGE_KEY = "artli_user";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { email: string };
        // Re-hydrate from mockUsers to get the full User object without storing password
        const fullUser = mockUsers.find((u) => u.email === parsed.email);
        if (fullUser) {
          setUser(fullUser);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((email: string, password: string): { success: boolean; error?: string } => {
    const found = getUserByEmail(email);
    if (!found) {
      return { success: false, error: "メールアドレスが見つかりません。" };
    }
    if (found.password !== password) {
      return { success: false, error: "パスワードが正しくありません。" };
    }
    setUser(found);
    const { password: _, ...userWithoutPassword } = found;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
