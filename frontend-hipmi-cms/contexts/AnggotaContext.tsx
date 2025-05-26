"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import api from "@/services/api";
import { useAuth } from "./AuthContext"; // Assuming authentication is needed

export interface AnggotaItem {
  id: number;
  anggota_nama: string;
  anggota_email: string;
  anggota_telepon: string;
  anggota_jabatan: string | number;
  anggota_bidang: string;
  anggota_perusahaan: string;
  anggota_perusahaan_alamat: string;
  anggota_perusahaan_logo: string | null;
  anggota_perusahaan_website: string | null;
  anggota_pengalaman: string | null;
  anggota_foto: string | null;
  anggota_instagram: string | null;
  anggota_facebook: string | null;
  anggota_linkedin: string | null;
  anggota_tiktok: string | null;
}

export interface AnggotaPayload {
  nama: string;
  email: string;
  telepon: string;
  jabatan: string;
  bidang: string;
  perusahaan: string;
  perusahaan_alamat: string;
  perusahaan_logo?: File | null;
  perusahaan_website?: string | null;
  pengalaman?: string | null;
  foto?: File | null;
  instagram?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  tiktok?: string | null;
}

interface AnggotaContextType {
  anggotaList: AnggotaItem[];
  isLoading: boolean;
  error: string | null;
  fetchAnggotaList: () => Promise<void>;
  getAnggotaById: (id: number) => Promise<AnggotaItem | null>;
  createAnggota: (payload: AnggotaPayload) => Promise<AnggotaItem | null>;
  updateAnggota: (
    id: number,
    payload: AnggotaPayload
  ) => Promise<AnggotaItem | null>;
  deleteAnggota: (id: number) => Promise<boolean>;
  clearError: () => void;
}

const AnggotaContext = createContext<AnggotaContextType | undefined>(undefined);

export const AnggotaProvider = ({ children }: { children: ReactNode }) => {
  const [anggotaList, setAnggotaList] = useState<AnggotaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth(); // Use token if API requires authentication

  const clearError = () => setError(null);

  const fetchAnggotaList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<AnggotaItem[]>("/anggota");
      setAnggotaList(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil daftar anggota"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAnggotaById = async (id: number): Promise<AnggotaItem | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<AnggotaItem>(`/anggota/${id}`);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Gagal mengambil anggota dengan ID ${id}`
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createAnggota = async (
    payload: AnggotaPayload
  ): Promise<AnggotaItem | null> => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      const value = payload[key as keyof AnggotaPayload];
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    try {
      const response = await api.post<AnggotaItem>("/anggota", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchAnggotaList();
      return response.data;
    } catch (err: any) {
      // Simplified error handling, can be expanded like in KegiatanContext
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal membuat anggota baru"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAnggota = async (
    id: number,
    payload: AnggotaPayload
): Promise<AnggotaItem | null> => {
    console.log(payload);
    setIsLoading(true);
    setError(null);
    const formData = new FormData();

    // Append required string fields
    formData.append("nama", payload.nama);
    formData.append("email", payload.email);
    formData.append("telepon", payload.telepon);
    formData.append("jabatan", payload.jabatan);
    formData.append("bidang", payload.bidang);
    formData.append("perusahaan", payload.perusahaan);
    formData.append("perusahaan_alamat", payload.perusahaan_alamat);

    if (payload.perusahaan_website) {
      formData.append("perusahaan_website", payload.perusahaan_website);
    }
    if (payload.pengalaman) {
      formData.append("pengalaman", payload.pengalaman);
    }
    if (payload.instagram) {
      formData.append("instagram", payload.instagram);
    }
    if (payload.facebook) {
      formData.append("facebook", payload.facebook);
    }
    if (payload.linkedin) {
      formData.append("linkedin", payload.linkedin);
    }
    if (payload.tiktok) {
      formData.append("tiktok", payload.tiktok);
    }

    if (payload.foto) { 
      formData.append("foto", payload.foto);
    }
    if (payload.perusahaan_logo) { 
      formData.append("perusahaan_logo", payload.perusahaan_logo);
    }

    formData.append("_method", "PUT");

    try {
      const response = await api.post<AnggotaItem>(`/anggota/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchAnggotaList();
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Gagal memperbarui anggota dengan ID ${id}`
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAnggota = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/anggota/${id}`);
      fetchAnggotaList();
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Gagal menghapus anggota dengan ID ${id}`
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AnggotaContextType = {
    anggotaList,
    isLoading,
    error,
    fetchAnggotaList,
    getAnggotaById,
    createAnggota,
    updateAnggota,
    deleteAnggota,
    clearError,
  };

  return (
    <AnggotaContext.Provider value={contextValue}>
      {children}
    </AnggotaContext.Provider>
  );
};

export const useAnggota = () => {
  const context = useContext(AnggotaContext);
  if (context === undefined) {
    throw new Error("useAnggota must be used within an AnggotaProvider");
  }
  return context;
};
