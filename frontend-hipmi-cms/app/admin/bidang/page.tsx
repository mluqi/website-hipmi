"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useBidang } from "@/contexts/BidangContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const AdminBidangPage = () => {
  const {
    bidangList,
    isLoading,
    error,
    fetchBidangList,
    deleteBidang,
    clearError,
  } = useBidang();

  useEffect(() => {
    fetchBidangList();
  }, [fetchBidangList]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus bidang ini?")) {
      const success = await deleteBidang(id);
      if (!success && error) {
        alert(`Gagal menghapus bidang: ${error}`);
        clearError(); 
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );

  if (error && !bidangList.length)
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => {
            clearError();
            fetchBidangList();
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
        <h1 className="text-2xl font-bold text-textcolor">Manajemen Bidang Usaha</h1>
        <Link href="/admin/bidang/tambah" legacyBehavior>
          <a className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90">
            Tambah Bidang Usaha Baru
          </a>
        </Link>
      </div>

      {bidangList.length === 0 && !isLoading ? (
        <p className="text-center text-textcolor">Belum ada bidang.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg text-textcolor">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">Nama Bidang</th>
              <th className="text-left py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bidangList.map((bidang) => (
              <tr
                key={bidang.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{bidang.id}</td>
                <td className="py-3 px-4">{bidang.bidang_nama}</td>
                <td className="py-3 px-4">
                  <Link href={`/admin/bidang/edit/${bidang.id}`} legacyBehavior>
                    <a className="text-blue-600 hover:underline mr-2">Edit</a>
                  </Link>
                  <button
                    onClick={() => handleDelete(bidang.id)}
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

export default AdminBidangPage;
