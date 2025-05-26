"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useJabatan } from "@/contexts/JabatanContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const AdminJabatanPage = () => {
  const {
    jabatanList,
    isLoading,
    error,
    fetchJabatanList,
    deleteJabatan,
    clearError,
  } = useJabatan();

  useEffect(() => {
    fetchJabatanList();
  }, [fetchJabatanList]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus jabatan ini?")) {
      const success = await deleteJabatan(id);
      if (!success && error) {
        // Jika ada error spesifik dari backend (misal: jabatan masih digunakan)
        alert(`Gagal menghapus jabatan: ${error}`);
        clearError(); // Bersihkan error setelah ditampilkan
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );

  if (error && !jabatanList.length)
    // Tampilkan error utama jika fetch awal gagal
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => {
            clearError();
            fetchJabatanList();
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Coba Lagi
        </button>
      </div>
    );

  return (
    <div className="container mx-auto p-4 md:p-8  text-xs md:text-sm lg:text-base">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-textcolor">Manajemen Jabatan</h1>
        <Link href="/admin/jabatan/tambah" legacyBehavior>
          <a className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90">
            Tambah Jabatan Baru
          </a>
        </Link>
      </div>

      {jabatanList.length === 0 && !isLoading ? (
        <p className="text-center text-textcolor">Belum ada jabatan.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg text-textcolor">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">Nama Jabatan</th>
              <th className="text-left py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jabatanList.map((jabatan) => (
              <tr
                key={jabatan.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{jabatan.id}</td>
                <td className="py-3 px-4 text-textcolor">{jabatan.jabatan_name}</td>
                <td className="py-3 px-4">
                  <Link
                    href={`/admin/jabatan/edit/${jabatan.id}`}
                    legacyBehavior
                  >
                    <a className="text-blue-600 hover:underline mr-2">Edit</a>
                  </Link>
                  <button
                    onClick={() => handleDelete(jabatan.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminJabatanPage;
