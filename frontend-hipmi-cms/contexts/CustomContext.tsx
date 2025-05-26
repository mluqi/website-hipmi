"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import api from "@/services/api"; 

export interface SejarahItem {
  id?: number;
  sejarah_konten: string;
  sejarah_foto: string | null;
}

interface CustomContextType {
  sejarahData: SejarahItem | null;
  errorSejarah: string | null;
  loadingSejarah: boolean;
  fetchSejarah: () => Promise<void>;
  updateSejarah: (payload: FormData) => Promise<SejarahItem | null>;
  clearErrorSejarah: () => void;
}

const CustomContext = createContext<CustomContextType | null>(null);

export const CustomProvider = ({ children }: { children: ReactNode }) => {
  const [sejarahData, setSejarahData] = useState<SejarahItem | null>(null);
  const [errorSejarah, setErrorSejarah] = useState<string | null>(null);
  const [loadingSejarah, setLoadingSejarah] = useState<boolean>(false);

  const fetchSejarah = useCallback(async () => {
    setLoadingSejarah(true);
    setErrorSejarah(null);
    try {
      const response = await api.get("/sejarah"); 
      if (response.data && response.data.length > 0) {
        setSejarahData(response.data[0]);
      } else {
        setSejarahData(null);
      }
    } catch (err: any) {
      setErrorSejarah(err.response?.data?.message || err.message || "Terjadi kesalahan saat mengambil data sejarah");
      setSejarahData(null);
    } finally {
      setLoadingSejarah(false);
    }
  }, []);

  const updateSejarah = useCallback(async (payload: FormData) => {
    setLoadingSejarah(true);
    setErrorSejarah(null);
    try {
      const sejarahId = sejarahData?.id || 1;
      const response = await api.post(`/sejarah/${sejarahId}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSejarahData(response.data);
      return response.data;
    } catch (err: any) {
      setErrorSejarah(err.response?.data?.message || err.message || "Terjadi kesalahan saat memperbarui data sejarah");
      return null;
    } finally {
      setLoadingSejarah(false);
    }
  }, [sejarahData?.id]);

  const clearErrorSejarah = () => setErrorSejarah(null);

  const contextValue: CustomContextType = {
    sejarahData,
    errorSejarah,
    loadingSejarah,
    fetchSejarah,
    updateSejarah,
    clearErrorSejarah,
  };

  return (
    <CustomContext.Provider value={contextValue}>
      {children}
    </CustomContext.Provider>
  );
};

export const useCustom = () => {
  const context = useContext(CustomContext);
  if (!context) {
    throw new Error("useCustom must be used within a CustomProvider");
  }
  return context;
};