"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useKategori } from "@/contexts/KategoriContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const TambahPage = () => {
  const router = useRouter();
  const { createKategori, isLoading, error, clearError } = useKategori();
  const [kategoriName, setKategoriName] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    if (!kategoriName.trim()) {
      alert("Nama kategori tidak boleh kosong.");
      return;
    }

    const result = await createKategori({ kategori_nama: kategoriName });
    if (result) {
      setSuccessMessage("Kategori berhasil ditambahkan!");
      setKategoriName(""); 
      setTimeout(() => {
        router.push("/admin/kategori");
      }, 1500);
    } else {
      // Error is handled by context and displayed below
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-textcolor">Tambah Kategori Baru</h1>
        <Link href="/admin/kategori" legacyBehavior>
          <a className="text-secondary hover:text-secondary/80">
            &larr; Kembali ke Daftar Kategori
          </a>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Sukses!</strong>
              <span className="block sm:inline"> {successMessage}</span>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="kategoriName" className="block text-sm font-medium text-gray-700 mb-1">
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
            {isLoading ? <LoadingSpinner /> : "Simpan Kategori"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahPage;