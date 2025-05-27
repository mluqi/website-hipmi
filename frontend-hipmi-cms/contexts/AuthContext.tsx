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
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
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
      api
        .get("/user")
        .then((response) => {
          setUser(response.data);
          setToken(storedToken);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Token verification failed:", error);
          localStorage.removeItem("admin_token");
          setToken(null);
          setIsAuthenticated(false);
          router.replace("/admin/login");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const login = (newToken: string) => {
    localStorage.setItem("admin_token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    api
      .get("/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
      });
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      localStorage.removeItem("admin_token");
      setToken(null);
      setIsAuthenticated(false);
      setUser(null);
      router.replace("/admin/login");
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    // setError(null); // Dihapus agar error sebelumnya tidak hilang jika ada
    try {
      await api.post('/user/change-password', {
        old_password: oldPassword,
        new_password: newPassword,
      });
      // Tidak perlu fetch user lagi, karena password diubah di sisi server
      // dan tidak ada state user yang perlu diupdate di client terkait password ini
      setIsLoading(false);
      return true;
    } catch (err: any) {
      let errorMessage = "Gagal mengubah password.";
      if (err.response && err.response.data) {
        if (err.response.data.errors) { // Laravel validation errors
          const fieldErrors = Object.values(err.response.data.errors).flat().join(' ');
          errorMessage = `Error Validasi: ${fieldErrors}`;
        } else if (err.response.data.message) { // Custom error message
          errorMessage = err.response.data.message;
        }
      }
      // setError(errorMessage); // Dihapus agar error ditangani di page
      setIsLoading(false);
      throw new Error(errorMessage); // Melempar error agar bisa ditangkap di page
    }
  };
  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    setUser,
    logout,
    updatePassword,
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
