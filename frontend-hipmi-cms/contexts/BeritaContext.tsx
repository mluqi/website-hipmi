"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import api from '@/services/api'; 
import { useAuth } from './AuthContext';

export interface BeritaItem {
  id: number;
  berita_judul: string;
  berita_isi: string;
  berita_foto: string | null;
  berita_tanggal: string;
  berita_kategori: string;
}

export interface BeritaPayload {
  judul: string;
  isi: string;
  foto?: File | null;
  tanggal: string; 
  kategori: string;
}

export interface PaginatedBeritaResponse {
  current_page: number;
  data: BeritaItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface BeritaContextType {
  beritaList: BeritaItem[];
  isLoading: boolean;
  error: string | null;
  fetchBeritaList: (searchQuery?: string, page?: number, perPage?: number) => Promise<void>;
  getBeritaById: (id: number) => Promise<BeritaItem | null>;
  createBerita: (payload: BeritaPayload) => Promise<BeritaItem | null>;
  updateBerita: (id: number, payload: BeritaPayload) => Promise<BeritaItem | null>;
  deleteBerita: (id: number) => Promise<boolean>;
  clearError: () => void;
  isUploadingEditorImage: boolean; // State loading khusus untuk upload gambar editor
  uploadEditorImage: (file: File) => Promise<{ success: boolean; url?: string; id?: number; message?: string } | null>; // Tambahkan id ke tipe return
  currentPage: number;
  totalPages: number;
  totalBerita: number;
  beritaPerPage: number;
}

const BeritaContext = createContext<BeritaContextType | undefined>(undefined);

export const BeritaProvider = ({ children }: { children: ReactNode }) => {
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingEditorImage, setIsUploadingEditorImage] = useState(false); // State loading baru
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth(); // Ambil token jika API membutuhkan autentikasi
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBerita, setTotalBerita] = useState(0);
  const [beritaPerPage, setBeritaPerPage] = useState(10); // Default items per page

  const clearError = () => setError(null);

  const fetchBeritaList = useCallback(async (searchQuery?: string, page: number = 1, perPage: number = 10) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchQuery && searchQuery.trim() !== "") {
        params.append('search', searchQuery);
      }
      params.append('page', page.toString());
      params.append('per_page', perPage.toString());

      const response = await api.get<PaginatedBeritaResponse>(`/berita?${params.toString()}`); 
      setBeritaList(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalBerita(response.data.total);
      setBeritaPerPage(response.data.per_page);

    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Gagal mengambil daftar berita');
      setBeritaList([]); // Kosongkan list jika error
      setCurrentPage(1);
      setTotalPages(0);
      setTotalBerita(0);
    } finally {
      setIsLoading(false);
    }
  // Tidak ada dependensi eksternal yang berubah, hanya argumen dan state internal
  // Jika perPage diambil dari state, tambahkan ke dependensi jika perlu
  // Untuk saat ini, kita asumsikan perPage di-pass sebagai argumen atau default
  }, []); 

  const getBeritaById = async (id: number): Promise<BeritaItem | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<BeritaItem>(`/berita/${id}`); // Endpoint: GET /api/berita/{id}
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || `Gagal mengambil berita dengan ID ${id}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createBerita = async (payload: BeritaPayload): Promise<BeritaItem | null> => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('judul', payload.judul);
    formData.append('isi', payload.isi);
    formData.append('kategori', payload.kategori);
    if (payload.tanggal) {
      formData.append('tanggal', payload.tanggal);
    }
    if (payload.foto) {
      formData.append('foto', payload.foto);
    }

    try {
      const response = await api.post<BeritaItem>('/berita', formData, { 
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchBeritaList(); 
      return response.data;
    } catch (err: any) {
      let errorMessage = "Gagal membuat berita baru";
      if (err.response && err.response.data) {
        if (err.response.status === 422 && err.response.data.errors) {
          // Laravel validation errors: { field: ["message1", "message2"] }
          const fieldErrors = Object.values(err.response.data.errors)
            .map((messages: any) => (Array.isArray(messages) ? messages.join(', ') : messages))
            .join('; ');
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

  const updateBerita = async (id: number, payload: BeritaPayload): Promise<BeritaItem | null> => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('judul', payload.judul);
    formData.append('isi', payload.isi);
    formData.append('kategori', payload.kategori);
    
    if (payload.tanggal) {
      formData.append('tanggal', payload.tanggal);
    }
    if (payload.foto) {
      formData.append('foto', payload.foto);
    }
    // For PUT with FormData, Laravel expects a POST request with a _method field
    formData.append('_method', 'PUT');

    console.log(formData);
    console.log(payload);

    try {
      const response = await api.post<BeritaItem>(`/berita/${id}`, formData, { // Endpoint: POST /api/berita/{id} (due to _method: 'PUT')
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchBeritaList(); // Refresh list
      return response.data;
    } catch (err: any) {
      let errorMessage = `Gagal memperbarui berita dengan ID ${id}`;
      if (err.response && err.response.data) {
        if (err.response.status === 422 && err.response.data.errors) {
          const fieldErrors = Object.values(err.response.data.errors)
            .map((messages: any) => (Array.isArray(messages) ? messages.join(', ') : messages))
            .join('; ');
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

  const deleteBerita = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/berita/${id}`); // Endpoint: DELETE /api/berita/{id}
      fetchBeritaList(); // Refresh list
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || `Gagal menghapus berita dengan ID ${id}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadEditorImage = useCallback(async (file: File) => {
    console.log("Uploading editor image:", file);
    setIsUploadingEditorImage(true); // Gunakan state loading spesifik
    setError(null); // Atau gunakan state error spesifik jika perlu
    const formData = new FormData();
    formData.append('image_editor', file); // Nama field harus sesuai backend

    try {
      // Endpoint untuk upload gambar editor
      // Pastikan endpoint ini dilindungi jika hanya admin yang bisa upload
      const response = await api.post<{ success: boolean; url?: string; id?: number; message?: string }>('/upload-image-editor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Jika endpoint /upload-image-editor memerlukan otentikasi dan api service Anda tidak otomatis menambahkannya:
          ...(token && { Authorization: `Bearer ${token}` }), // Aktifkan ini karena route dilindungi auth:sanctum
        },
      });
      return response.data;
    } catch (err: any) {
      console.error("Error uploading image via context:", err.response?.data || err.message);
      let errorMessage = "Gagal mengunggah gambar editor";
       if (err.response && err.response.data && err.response.data.message) {
         errorMessage = err.response.data.message;
       } else if (err.message) {
         errorMessage = err.message;
       }
      // Pertimbangkan untuk tidak mengatur error global di sini jika ini adalah operasi latar belakang
      // setError(errorMessage); 
      return { success: false, message: errorMessage };
    } finally {
      setIsUploadingEditorImage(false); // Reset state loading spesifik
    }
  }, [token]); // Tambahkan token sebagai dependensi jika Anda menggunakannya di header

  const contextValue: BeritaContextType = {
    beritaList, isLoading, error, fetchBeritaList, getBeritaById, createBerita, updateBerita, deleteBerita, clearError, isUploadingEditorImage, uploadEditorImage,
    currentPage, totalPages, totalBerita, beritaPerPage,
  };

  return <BeritaContext.Provider value={contextValue}>{children}</BeritaContext.Provider>;
};

export const useBerita = () => {
  const context = useContext(BeritaContext);
  if (context === undefined) {
    throw new Error('useBerita must be used within a BeritaProvider');
  }
  return context;
};