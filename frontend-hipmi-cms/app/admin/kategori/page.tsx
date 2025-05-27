"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useKategori } from "@/contexts/KategoriContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const KategoriPage = () => {
  const {
    kategoriList,
    isLoading,
    error,
    fetchKategoriList,
    deleteKategori,
    clearError,
  } = useKategori();

  useEffect(() => {
    fetchKategoriList();
  }, [fetchKategoriList]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      const success = await deleteKategori(id);
      if (success) {
        // Optionally, refetch or rely on optimistic update
        fetchKategoriList(); 
      } else {
        // Error handling is managed by the context, but you can add specific UI feedback here
        alert("Gagal menghapus kategori.");
      }
    }
  };

  if (isLoading && kategoriList.length === 0) { // Show loading only on initial load
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => {
            clearError();
            fetchKategoriList();
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 text-xs md:text-sm lg:text-base">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-textcolor">Manajemen Kategori</h1>
        <Link href="/admin/kategori/tambah" legacyBehavior>
          <a className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90">
            Tambah Kategori
          </a>
        </Link>
      </div>

      {isLoading && <div className="text-center my-4"><LoadingSpinner /></div>}

      {kategoriList.length === 0 && !isLoading ? (
        <p className="text-center text-textcolor">Belum ada kategori.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg text-textcolor">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Nama Kategori</th>
                <th className="text-left py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kategoriList.map((kategori) => (
                <tr key={kategori.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{kategori.id}</td>
                  <td className="py-3 px-4">{kategori.kategori_nama}</td>
                  <td className="py-3 px-4">
                    <Link href={`/admin/kategori/edit/${kategori.id}`} legacyBehavior>
                      <a className="text-blue-600 hover:underline mr-3">Edit</a>
                    </Link>
                    <button onClick={() => handleDelete(kategori.id)} className="text-red-600 hover:underline">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default KategoriPage;