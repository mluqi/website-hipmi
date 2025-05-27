"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import Link from "next/link";
import { usePesan, PesanItem } from "@/contexts/PesanContext"; // PesanItem is already imported
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaSearch,
  FaReply,
} from "react-icons/fa";

const AdminPesanPage = () => {
  const {
    pesanList,
    isLoading,
    error,
    fetchPesanList,
    deletePesan,
    changeStatusPesan,
    clearError,
    currentPage,
    totalPages,
    pesanPerPage,
  } = usePesan();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "semua" | "pending" | "read" | "replied"
  >("semua");

  useEffect(() => {
    fetchPesanList(searchQuery, statusFilter, currentPage, pesanPerPage);
  }, [fetchPesanList, currentPage, pesanPerPage, searchQuery, statusFilter]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pesan ini?")) {
      await deletePesan(id);
    }
  };

  const handleChangeStatus = async (
    id: number,
    currentPesanStatus: PesanItem["pesan_status"] 
  ) => {
    let nextStatus: PesanItem["pesan_status"] | undefined;

    if (currentPesanStatus === "pending") {
      nextStatus = "read";
    } else if (currentPesanStatus === "read") {
      nextStatus = "replied";
    }
    if (nextStatus) {
      await changeStatusPesan(id, nextStatus);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPesanList(searchQuery, statusFilter, 1, pesanPerPage);
  };

  const handleFilterStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as "semua" | "pending" | "read" | "replied");
    fetchPesanList(
      searchQuery,
      e.target.value as "semua" | "pending" | "read" | "replied",
      1,
      pesanPerPage
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchPesanList(searchQuery, statusFilter, newPage, pesanPerPage);
    }
  };

  if (isLoading && pesanList.length === 0) {
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
            fetchPesanList(
              searchQuery,
              statusFilter,
              currentPage,
              pesanPerPage
            );
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
      <h1 className="text-2xl font-bold text-textcolor mb-6">
        Kotak Masuk Pesan
      </h1>

      <form
        onSubmit={handleSearchSubmit}
        className="mb-6 flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Cari nama, email, atau subjek..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-md w-full focus:ring-secondary focus:border-secondary text-textcolor text-sm"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:flex-none">
          <select
            value={statusFilter}
            onChange={handleFilterStatusChange}
            className="px-4 py-2.5 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary text-textcolor text-sm w-full sm:w-auto"
          >
            <option value="semua">Semua Status</option>
            <option value="pending">Belum Dibaca</option>
            <option value="read">Sudah Dibaca</option>
            <option value="replied">Sudah Dibalas</option>
          </select>
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2.5 rounded-md hover:bg-secondary/90 whitespace-nowrap text-sm"
          >
            Cari
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="text-center my-4">
          <LoadingSpinner />
        </div>
      )}

      {pesanList.length === 0 && !isLoading ? (
        <p className="text-center text-textcolor py-10">Tidak ada pesan.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg text-textcolor">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4 whitespace-nowrap">Nama</th>
                <th className="text-left py-3 px-4 hidden md:table-cell">Email</th>
                <th className="text-left py-3 px-4 max-w-xs whitespace-nowrap">Subjek</th>
                <th className="text-left py-3 px-4 hidden sm:table-cell whitespace-nowrap">Tanggal</th>
                <th className="text-left py-3 px-4 whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pesanList.map((pesan) => (
                <tr
                  key={pesan.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    pesan.pesan_status === "pending"
                      ? "font-semibold bg-blue-50"
                      : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <button
                      onClick={() =>
                        handleChangeStatus(pesan.id, pesan.pesan_status)
                      }
                      title={`Status: ${pesan.pesan_status}`}
                      disabled={pesan.pesan_status === "replied"}
                      className={`${
                        pesan.pesan_status === "replied"
                          ? "opacity-70 cursor-not-allowed"
                          : ""
                      } focus:outline-none`} // Removed border classes
                    >
                      {pesan.pesan_status === "pending" ? (
                        <FaEnvelope className="text-blue-500 text-lg" /> // Icon for Pending
                      ) : pesan.pesan_status === "read" ? (
                        <FaEnvelopeOpen className="text-green-500 text-lg" /> // Icon for Read
                      ) : (
                        <FaReply className="text-purple-600 text-lg" /> // Icon for Replied
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4">{pesan.pesan_nama}</td>
                  <td className="py-3 px-4 hidden md:table-cell">{pesan.pesan_email}</td>
                  <td className="py-3 px-4 max-w-[150px] sm:max-w-xs truncate">{pesan.pesan_subjek}</td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    {new Date(pesan.created_at).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <Link href={`/admin/pesan/${pesan.id}`} passHref legacyBehavior>
                      <a className="text-blue-600 hover:underline mr-3">
                        Lihat
                      </a>
                    </Link>
                    <button
                      onClick={() => handleDelete(pesan.id)}
                      className="text-red-600 hover:underline"
                      title="Hapus Pesan"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pesanList.length > 0 && totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isLoading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          <span className="text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isLoading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPesanPage;
