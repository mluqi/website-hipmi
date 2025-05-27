"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import api from "@/services/api";

export interface PesanItem {
  id: number;
  pesan_nama: string;
  pesan_email: string;
  pesan_subjek: string;
  pesan_isi: string;
  pesan_status: "pending" | "read" | "replied";
  created_at: string;
  updated_at: string;
}

export interface PaginatedPesanResponse {
  current_page: number;
  data: PesanItem[];
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

interface PesanContextType {
  pesanList: PesanItem[];
  isLoading: boolean;
  error: string | null;
  fetchPesanList: (
    searchQuery?: string,
    status?: "semua" | "pending" | "read" | "replied",
    page?: number,
    perPage?: number
  ) => Promise<void>;
  getPesanDetail: (id: number) => Promise<PesanItem | null>;
  changeStatusPesan: (id: number, pesan_status: string) => Promise<PesanItem>;
  deletePesan: (id: number) => Promise<boolean>;
  clearError: () => void;
  currentPage: number;
  totalPages: number;
  totalPesan: number;
  pesanPerPage: number;
}

const PesanContext = createContext<PesanContextType | undefined>(undefined);

export const PesanProvider = ({ children }: { children: ReactNode }) => {
  const [pesanList, setPesanList] = useState<PesanItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPesan, setTotalPesan] = useState(0);
  const [pesanPerPage, setPesanPerPage] = useState(10);

  const clearError = useCallback(() => setError(null), []);

  const fetchPesanList = useCallback(
    async (
      searchQuery?: string,
      status: "semua" | "pending" | "read" | "replied" = "semua",
      page: number = 1,
      perPage: number = 10
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (searchQuery && searchQuery.trim() !== "") {
          params.append("search", searchQuery);
        }
        if (status !== "semua") {
          params.append("status", status);
        }
        params.append("page", page.toString());
        params.append("per_page", perPage.toString());

        const response = await api.get<PaginatedPesanResponse>(
          `/pesan?${params.toString()}`
        );
        setPesanList(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.last_page);
        setTotalPesan(response.data.total);
        setPesanPerPage(response.data.per_page);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Gagal mengambil daftar pesan"
        );
        setPesanList([]);
        setCurrentPage(1);
        setTotalPages(0);
        setTotalPesan(0);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getPesanDetail = useCallback(
    async (id: number): Promise<PesanItem | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<PesanItem>(`/pesan/${id}`);
        // Update list jika pesan yang dibuka ada di list saat ini
        setPesanList((prevList) =>
          prevList.map((p) => (p.id === id ? { ...p, is_read: true } : p))
        );
        return response.data;
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            `Gagal mengambil detail pesan dengan ID ${id}`
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const changeStatusPesan = useCallback(
    async (id: number, pesan_status: string): Promise<PesanItem> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.put<PesanItem>(
          `/pesan/${id}/change-status`,
          {
            pesan_status,
          }
        );
        setPesanList((prevList) =>
          prevList.map((pesan) => (pesan.id === id ? response.data : pesan))
        );
        return response.data;
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            `Gagal mengubah status baca pesan ID ${id}`
        );
        return Promise.reject(
          err.response?.data || err.message || `Gagal mengubah status pesan`
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deletePesan = useCallback(
    async (id: number): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        await api.delete(`/pesan/${id}`);
        // Optimistic update or refetch
        setPesanList((prev) => prev.filter((pesan) => pesan.id !== id));
        // Jika ingin refetch halaman saat ini setelah delete:
        // fetchPesanList(undefined, "semua", currentPage, pesanPerPage);
        return true;
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            `Gagal menghapus pesan dengan ID ${id}`
        );
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [] // Tambahkan currentPage, pesanPerPage jika menggunakan refetch di atas
  );

  const contextValue: PesanContextType = {
    pesanList,
    isLoading,
    error,
    fetchPesanList,
    getPesanDetail,
    changeStatusPesan,
    deletePesan,
    clearError,
    currentPage,
    totalPages,
    totalPesan,
    pesanPerPage,
  };

  return (
    <PesanContext.Provider value={contextValue}>
      {children}
    </PesanContext.Provider>
  );
};

export const usePesan = () => {
  const context = useContext(PesanContext);
  if (context === undefined) {
    throw new Error("usePesan must be used within a PesanProvider");
  }
  return context;
};
