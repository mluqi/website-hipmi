"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAnggota } from "@/contexts/AnggotaContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";
import { useJabatan } from "@/contexts/JabatanContext";

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const AdminAnggotaPage = () => {
  const {
    anggotaList,
    isLoading,
    error,
    fetchAnggotaList,
    deleteAnggota,
    clearError,
    currentPage,
    totalPages,
    anggotaPerPage, // Jika ingin mengontrol perPage dari sini, atau gunakan default context
  } = useAnggota();

  const { jabatanList, fetchJabatanList } = useJabatan();
  // State untuk search query jika ingin diintegrasikan dengan pagination
  // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Panggil dengan currentPage dari context atau 1 jika baru load
    // Jika ada searchQuery, sertakan: fetchAnggotaList(searchQuery, currentPage, anggotaPerPage)
    fetchAnggotaList(undefined, currentPage, anggotaPerPage);
    fetchJabatanList();
  }, [fetchAnggotaList, fetchJabatanList, currentPage, anggotaPerPage]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      await deleteAnggota(id);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchAnggotaList(undefined, currentPage + 1, anggotaPerPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchAnggotaList(undefined, currentPage - 1, anggotaPerPage);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => {
            clearError();
            fetchAnggotaList();
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Coba Lagi
        </button>
      </div>
    );

  return (
    <div className="container mx-auto p-4 md:p-8 text-xs md:text-sm lg:text-base">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-textcolor">Manajemen Anggota</h1>
        <Link href="/admin/anggota/tambah" legacyBehavior>
          <a className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90">
            Tambah Anggota
          </a>
        </Link>
      </div>

      {anggotaList.length === 0 ? (
        <p className="text-center text-textcolor">Belum ada anggota.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg text-textcolor">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Nama</th>
                {/* <th className="text-left py-3 px-4 min-w-[150px]">Email</th> */}
                {/* <th className="text-left py-3 px-4">Telepon</th> */}
                <th className="text-left py-3 px-4">Jabatan</th>
                {/* <th className="text-left py-3 px-4">Bidang</th> */}
                {/* <th className="text-left py-3 px-4">Perusahaan</th> */}
                {/* <th className="text-left py-3 px-4">Foto</th> */}
                {/* <th className="text-left py-3 px-4">Logo Perusahaan</th> */}
                <th className="text-left py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {anggotaList.map((anggota) => (
                <tr
                  key={anggota.id}
                  className="border-b border-gray-200 hover:bg-gray-50 rounded-lg"
                >
                  <td className="py-3 px-4">{anggota.id}</td>
                  <td className="py-3 px-4">{anggota.anggota_nama}</td>
                  {/* <td className="py-3 px-4">{anggota.anggota_email}</td> */}
                  {/* <td className="py-3 px-4">{anggota.anggota_telepon}</td> */}
                  <td className="py-3 px-4">
                    {jabatanList.map((jabatan) => {
                      if (jabatan.id === anggota.anggota_jabatan) {
                        return jabatan.jabatan_name;
                      }
                      return null;
                    })}
                  </td>
                  {/* <td className="py-3 px-4">{anggota.anggota_bidang}</td> */}
                  {/* <td className="py-3 px-4">{anggota.anggota_perusahaan}</td> */}
                  {/* <td className="py-3 px-4">
                    {anggota.anggota_foto ? (
                      <Image
                        src={`${urlBase}/storage/${anggota.anggota_foto}`}
                        alt={`Foto ${anggota.anggota_nama}`}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <Image
                        src="/assets/placeholder-user.png"
                        alt="Tidak ada foto"
                        width={50}
                        height={50}
                        className="rounded-full object-cover bg-slate-200"
                      />
                    )}
                  </td> */}
                  {/* <td className="py-3 px-4">
                    {anggota.anggota_perusahaan_logo ? (
                      <Image
                        src={`${urlBase}/storage/${anggota.anggota_perusahaan_logo}`}
                        alt={`Logo ${anggota.anggota_perusahaan}`}
                        width={50}
                        height={50}
                        className="rounded-md object-contain"
                      />
                    ) : (
                      <Image
                        src="/assets/placeholder-logo.png"
                        alt="Tidak ada logo"
                        width={50}
                        height={50}
                        className="rounded-md object-contain bg-slate-200"
                      />
                    )}
                  </td> */}
                  <td className="py-3 px-4">
                    <Link
                      href={`/admin/anggota/edit/${anggota.id}`}
                      legacyBehavior
                    >
                      <a className="text-blue-600 hover:underline mr-2">Edit</a>
                    </Link>
                    <button
                      onClick={() => handleDelete(anggota.id)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {anggotaList.length > 0 && totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1 || isLoading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          <span className="text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={handleNextPage}
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

export default AdminAnggotaPage;
