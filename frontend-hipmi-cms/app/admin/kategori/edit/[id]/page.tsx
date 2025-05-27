"use client";

import React, { useEffect, useState, FormEvent, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useKategori } from "@/contexts/KategoriContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const EditPage = () => {
  const router = useRouter();
  const params = useParams();
  const kategoriId = params.id ? parseInt(params.id as string) : null;

  const { getKategoriById, updateKategori, isLoading, error, clearError } =
    useKategori();
  const [kategoriName, setKategoriName] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchKategoriData = useCallback(async () => {
    if (!kategoriId) {
      setErrorMessage("ID Kategori tidak valid.");
      setInitialLoading(false);
      return;
    }
    clearError();
    setErrorMessage(null);
    setInitialLoading(true);
    const kategori = await getKategoriById(kategoriId);
    if (kategori) {
      setKategoriName(kategori.kategori_nama);
    } else {
      setErrorMessage(
        error || `Kategori dengan ID ${kategoriId} tidak ditemukan.`
      );
    }
    setInitialLoading(false);
  }, [kategoriId, getKategoriById, clearError, error]);

  useEffect(() => {
    fetchKategoriData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!kategoriName.trim()) {
      alert("Nama kategori tidak boleh kosong.");
      return;
    }

    if (kategoriId) {
      const result = await updateKategori(kategoriId, {
        kategori_nama: kategoriName,
      });
      if (result) {
        setSuccessMessage("Kategori berhasil diperbarui!");
        setTimeout(() => {
          router.push("/admin/kategori");
        }, 1500);
      } else {
        // Error from context will be displayed
      }
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-textcolor">Edit Kategori</h1>
        <Link href="/admin/kategori" legacyBehavior>
          <a className="text-secondary hover:text-secondary/80">
            &larr; Kembali ke Daftar Kategori
          </a>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {errorMessage && !error && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        {kategoriId && !errorMessage && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="kategoriName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama Kategori
              </label>
              <input
                type="text"
                id="kategoriName"
                value={kategoriName}
                onChange={(e) => setKategoriName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-textcolor"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:bg-gray-400"
            >
              {isLoading ? <LoadingSpinner /> : "Simpan Perubahan"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPage;
