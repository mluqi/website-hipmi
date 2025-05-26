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

export interface BidangItem {
  id: number;
  bidang_nama: string;
}

export interface BidangPayload {
  bidang_nama: string;
}

interface BidangContextType {
  bidangList: BidangItem[];
  isLoading: boolean;
  error: string | null;
  fetchBidangList: () => Promise<void>;
  getBidangById: (id: number) => Promise<BidangItem | null>;
  createBidang: (payload: BidangPayload) => Promise<BidangItem | null>;
  updateBidang: (
    id: number,
    payload: BidangPayload
  ) => Promise<BidangItem | null>;
  deleteBidang: (id: number) => Promise<boolean>;
  clearError: () => void;
}

const BidangContext = createContext<BidangContextType | undefined>(undefined);

export const BidangProvider = ({ children }: { children: ReactNode }) => {
  const [bidangList, setBidangList] = useState<BidangItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth(); // Use token if API requires authentication

  const clearError = () => setError(null);

  const fetchBidangList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<BidangItem[]>("/bidang");
      setBidangList(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil daftar bidang"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getBidangById = async (id: number): Promise<BidangItem | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<BidangItem>(`/bidang/${id}`);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Gagal mengambil bidang dengan ID ${id}`
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createBidang = async (
    payload: BidangPayload
  ): Promise<BidangItem | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<BidangItem>("/bidang", payload);
      fetchBidangList();
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal membuat bidang baru"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBidang = async (
    id: number,
    payload: BidangPayload
  ): Promise<BidangItem | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.put<BidangItem>(`/bidang/${id}`, payload);
      fetchBidangList();
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Gagal memperbarui bidang dengan ID ${id}`
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBidang = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/bidang/${id}`);
      fetchBidangList();
      return true;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Gagal menghapus bidang dengan ID ${id}`
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: BidangContextType = {
    bidangList,
    isLoading,
    error,
    fetchBidangList,
    getBidangById,
    createBidang,
    updateBidang,
    deleteBidang,
    clearError,
  };

  return (
    <BidangContext.Provider value={contextValue}>
      {children}
    </BidangContext.Provider>
  );
};

export const useBidang = () => {
  const context = useContext(BidangContext);
  if (context === undefined) {
    throw new Error("useBidang must be used within a BidangProvider");
  }
  return context;
};
