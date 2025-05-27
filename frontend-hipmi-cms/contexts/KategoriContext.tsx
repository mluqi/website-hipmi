"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import api from "@/services/api";
import { useAuth } from "./AuthContext";

export interface KategoriItem {
  id: number;
  kategori_nama: string;
}

export interface KategoriPayload {
  kategori_nama: string;
}

interface KategoriContextType {
  kategoriList: KategoriItem[];
  isLoading: boolean;
  error: string | null;
  fetchKategoriList: () => Promise<void>;
  getKategoriById: (id: number) => Promise<KategoriItem | null>;
  createKategori: (payload: KategoriPayload) => Promise<KategoriItem | null>;
  updateKategori: (
    id: number,
    payload: KategoriPayload
  ) => Promise<KategoriItem | null>;
  deleteKategori: (id: number) => Promise<boolean>;
  clearError: () => void;
}

const KategoriContext = createContext<KategoriContextType | undefined>(
  undefined
);

export const KategoriProvider = ({ children }: { children: ReactNode }) => {
  const [kategoriList, setKategoriList] = useState<KategoriItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const clearError = () => setError(null);

  const fetchKategoriList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<KategoriItem[]>("/kategori");
      setKategoriList(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil daftar kategori"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);
  const getKategoriById = useCallback(
    async (id: number): Promise<KategoriItem | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<KategoriItem>(`/kategori/${id}`);
        return response.data;
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Gagal mengambil kategori"
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const createKategori = useCallback(
    async (payload: KategoriPayload): Promise<KategoriItem | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.post<KategoriItem>("/kategori", payload);
        setKategoriList((prev) => [...prev, response.data]);
        return response.data;
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "Gagal membuat kategori"
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateKategori = useCallback(
    async (
      id: number,
      payload: KategoriPayload
    ): Promise<KategoriItem | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.put<KategoriItem>(
          `/kategori/${id}`,
          payload
        );
        setKategoriList((prev) =>
          prev.map((kategori) =>
            kategori.id === id ? response.data : kategori
          )
        );
        return response.data;
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Gagal memperbarui kategori"
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteKategori = useCallback(async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/kategori/${id}`);
      setKategoriList((prev) => prev.filter((kategori) => kategori.id !== id));
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Gagal menghapus kategori"
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const contextValue: KategoriContextType = {
    kategoriList,
    isLoading,
    error,
    fetchKategoriList,
    getKategoriById,
    createKategori,
    updateKategori,
    deleteKategori,
    clearError,
  };

  return (
    <KategoriContext.Provider value={contextValue}>
      {children}
    </KategoriContext.Provider>
  );
};

export const useKategori = () => {
  const context = useContext(KategoriContext);
  if (context === undefined) {
    throw new Error("useKategori must be used within a KategoriProvider");
  }
  return context;
};
