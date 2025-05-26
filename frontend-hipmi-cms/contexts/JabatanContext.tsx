"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import api from "@/services/api";
import { useAuth } from "./AuthContext"; // Assuming authentication might be needed

export interface JabatanItem {
  id: number;
  jabatan_name: string;
}

export interface JabatanPayload {
  jabatan_name: string;
}

interface JabatanContextType {
  jabatanList: JabatanItem[];
  isLoading: boolean;
  error: string | null;
  fetchJabatanList: () => Promise<void>;
  getJabatanById: (id: number) => Promise<JabatanItem | null>;
  createJabatan: (payload: JabatanPayload) => Promise<JabatanItem | null>;
  updateJabatan: (
    id: number,
    payload: JabatanPayload
  ) => Promise<JabatanItem | null>;
  deleteJabatan: (id: number) => Promise<boolean>;
  clearError: () => void;
}

const JabatanContext = createContext<JabatanContextType | undefined>(undefined);

export const JabatanProvider = ({ children }: { children: ReactNode }) => {
  const [jabatanList, setJabatanList] = useState<JabatanItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth(); // Use token if API requires authentication

  const clearError = () => setError(null);

  const fetchJabatanList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<JabatanItem[]>("/jabatan");
      setJabatanList(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil daftar jabatan"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getJabatanById = async (id: number): Promise<JabatanItem | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<JabatanItem>(`/jabatan/${id}`);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Gagal mengambil jabatan dengan ID ${id}`
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createJabatan = async (
    payload: JabatanPayload
  ): Promise<JabatanItem | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<JabatanItem>("/jabatan", payload);
      fetchJabatanList();
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal membuat jabatan baru"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateJabatan = async (
    id: number,
    payload: JabatanPayload
  ): Promise<JabatanItem | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.put<JabatanItem>(`/jabatan/${id}`, payload);
      fetchJabatanList();
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Gagal memperbarui jabatan dengan ID ${id}`
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJabatan = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/jabatan/${id}`);
      fetchJabatanList();
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Gagal menghapus jabatan dengan ID ${id}`
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: JabatanContextType = {
    jabatanList,
    isLoading,
    error,
    fetchJabatanList,
    getJabatanById,
    createJabatan,
    updateJabatan,
    deleteJabatan,
    clearError,
  };

  return (
    <JabatanContext.Provider value={contextValue}>
      {children}
    </JabatanContext.Provider>
  );
};

export const useJabatan = () => {
  const context = useContext(JabatanContext);
  if (context === undefined) {
    throw new Error("useJabatan must be used within a JabatanProvider");
  }
  return context;
};
