"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import api from "@/services/api";
import { useAuth } from "./AuthContext"; // Assuming authentication is needed for Kegiatan management

export interface KegiatanItem {
  id: number;
  kegiatan_judul: string;
  kegiatan_isi: string;
  kegiatan_foto: string | null;
  kegiatan_kategori: string; // Corrected based on common sense and BeritaContext pattern
  kegiatan_tanggal: string;
  kegiatan_waktu: string;
  kegiatan_lokasi: string;
}

export interface KegiatanPayload {
  judul: string;
  isi: string;
  foto?: File | null;
  kategori: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
}

interface KegiatanContextType {
  kegiatanList: KegiatanItem[];
  isLoading: boolean;
  error: string | null;
  fetchKegiatanList: () => Promise<void>;
  getKegiatanById: (id: number) => Promise<KegiatanItem | null>;
  createKegiatan: (payload: KegiatanPayload) => Promise<KegiatanItem | null>;
  updateKegiatan: (
    id: number,
    payload: KegiatanPayload
  ) => Promise<KegiatanItem | null>;
  deleteKegiatan: (id: number) => Promise<boolean>;
  clearError: () => void;
}

const KegiatanContext = createContext<KegiatanContextType | undefined>(
  undefined
);

export const KegiatanProvider = ({ children }: { children: ReactNode }) => {
  const [kegiatanList, setKegiatanList] = useState<KegiatanItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth(); // Use token if API requires authentication

  const clearError = () => setError(null);

  const fetchKegiatanList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<KegiatanItem[]>("/kegiatan"); // Endpoint: GET /api/kegiatan
      setKegiatanList(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil daftar kegiatan"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getKegiatanById = async (id: number): Promise<KegiatanItem | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<KegiatanItem>(`/kegiatan/${id}`); // Endpoint: GET /api/kegiatan/{id}
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Gagal mengambil kegiatan dengan ID ${id}`
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createKegiatan = async (
    payload: KegiatanPayload
  ): Promise<KegiatanItem | null> => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("judul", payload.judul);
    formData.append("isi", payload.isi);
    formData.append("kategori", payload.kategori);
    formData.append("tanggal", payload.tanggal); 
    formData.append("waktu", payload.waktu);     
    formData.append("lokasi", payload.lokasi); 

    if (payload.foto) {
      formData.append("foto", payload.foto);
    }

    try {
      const response = await api.post<KegiatanItem>("/kegiatan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchKegiatanList(); // Refresh list after creation
      return response.data;
    } catch (err: any) {
      let errorMessage = "Gagal membuat kegiatan baru";
      if (err.response && err.response.data) {
        if (err.response.status === 422 && err.response.data.errors) {
          // Laravel validation errors: { field: ["message1", "message2"] }
          const fieldErrors = Object.values(err.response.data.errors)
            .map((messages: any) =>
              Array.isArray(messages) ? messages.join(", ") : messages
            )
            .join("; ");
          errorMessage = `Error Validasi: ${fieldErrors}`;
        } else if (err.response.data.message) {
          // General error message from backend
          errorMessage = err.response.data.message;
        }
      } else if (err.message) {
        // Network or other errors
        errorMessage = err.message;
      }
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateKegiatan = async (
    id: number,
    payload: KegiatanPayload
  ): Promise<KegiatanItem | null> => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("judul", payload.judul);
    formData.append("isi", payload.isi);
    formData.append("kategori", payload.kategori);

    formData.append("tanggal", payload.tanggal);
    formData.append("waktu", payload.waktu);    
    formData.append("lokasi", payload.lokasi); 

    if (payload.foto) {
      formData.append("foto", payload.foto);
    }
    // For PUT with FormData, Laravel expects a POST request with a _method field
    formData.append("_method", "PUT");

    console.log(formData);
    console.log(payload);

    try {
      const response = await api.post<KegiatanItem>(
        `/kegiatan/${id}`,
        formData,
        {
          // Endpoint: POST /api/kegiatan/{id} (due to _method: 'PUT')
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      fetchKegiatanList(); // Refresh list
      return response.data;
    } catch (err: any) {
      let errorMessage = `Gagal memperbarui kegiatan dengan ID ${id}`;
      if (err.response && err.response.data) {
        if (err.response.status === 422 && err.response.data.errors) {
          const fieldErrors = Object.values(err.response.data.errors)
            .map((messages: any) =>
              Array.isArray(messages) ? messages.join(", ") : messages
            )
            .join("; ");
          errorMessage = `Error Validasi: ${fieldErrors}`;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteKegiatan = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/kegiatan/${id}`); // Endpoint: DELETE /api/kegiatan/{id}
      fetchKegiatanList(); // Refresh list
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Gagal menghapus kegiatan dengan ID ${id}`
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: KegiatanContextType = {
    kegiatanList,
    isLoading,
    error,
    fetchKegiatanList,
    getKegiatanById,
    createKegiatan,
    updateKegiatan,
    deleteKegiatan,
    clearError,
  };

  return (
    <KegiatanContext.Provider value={contextValue}>
      {children}
    </KegiatanContext.Provider>
  );
};

export const useKegiatan = () => {
  const context = useContext(KegiatanContext);
  if (context === undefined) {
    throw new Error("useKegiatan must be used within a KegiatanProvider");
  }
  return context;
};
