"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import api from "../services/api";

interface AuthContextType {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    if (storedToken) {
      setIsLoading(true);
      // Verifikasi token ke backend
      api
        .get("/user")
        .then((response) => {
          setUser(response.data);
          setToken(storedToken); // Pastikan token diatur setelah verifikasi
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Token verification failed:", error);
          // Hapus token yang tidak valid dari localStorage
          localStorage.removeItem("admin_token");
          setToken(null);
          setIsAuthenticated(false);
          router.replace("/admin/login"); // Redirect ke halaman login
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    setIsLoading(false);
  }, []); // Efek ini hanya berjalan sekali saat mount

  const login = (newToken: string) => {
    api.get("/user").then((res) => {
      setUser(res.data);
    });
    localStorage.setItem("admin_token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      // Hit endpoint logout di backend
      await api.post('/logout');
      localStorage.removeItem("admin_token");
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
      // Redirect ke halaman login setelah logout
      router.replace('/admin/login');
    } catch (error) {
      console.error("Logout failed:", error);
      // Tangani error jika terjadi masalah saat logout di backend
      // Misalnya, tampilkan pesan error ke pengguna
    }
  }

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    setUser,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
