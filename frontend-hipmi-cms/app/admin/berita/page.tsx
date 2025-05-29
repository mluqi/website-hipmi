"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useBerita, BeritaItem } from "@/contexts/BeritaContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";
const urlBase = "https://dev3-p3.palindo.id";

const AdminBeritaPage = () => {
  const {
    beritaList,
    isLoading,
    error,
    fetchBeritaList,
    deleteBerita,
    clearError,
    currentPage,
    totalPages,
    beritaPerPage, // Jika ingin mengontrol perPage dari sini
  } = useBerita();

  // State untuk search query jika ingin diintegrasikan dengan pagination
  // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Panggil dengan currentPage dari context atau 1 jika baru load
    // Jika ada searchQuery, sertakan: fetchBeritaList(searchQuery, currentPage, beritaPerPage)
    fetchBeritaList(undefined, currentPage, beritaPerPage);
  }, [fetchBeritaList, currentPage, beritaPerPage]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      await deleteBerita(id);
      // Opsional: jika setelah delete ingin kembali ke halaman 1 atau halaman saat ini
      // fetchBeritaList(undefined, currentPage, beritaPerPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchBeritaList(undefined, currentPage + 1, beritaPerPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchBeritaList(undefined, currentPage - 1, beritaPerPage);
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
          onClick={clearError}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Coba Lagi
        </button>
      </div>
    );

  return (
    <div className="container mx-auto p-4 md:p-8  text-xs md:text-sm lg:text-base">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-textcolor">Manajemen Berita</h1>
        <Link href="/admin/berita/tambah" legacyBehavior>
          <a className="bg-secondary text-white px-2 py-2 rounded-md hover:bg-secondary/90">
            Tambah Berita
          </a>
        </Link>
      </div>

      {beritaList.length === 0 ? (
        <p className="text-center text-textcolor">Belum ada berita.</p>
      ) : (
        <div className="overflow-x-auto text-xs lg:text-base">
          <table className="min-w-full bg-white shadow-md rounded-lg text-textcolor">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Judul</th>
                {/* <th className="text-left py-3 px-4 max-w-xs">Isi (Cuplikan)</th> */}
                {/* <th className="text-left py-3 px-4">Foto</th> */}
                <th className="text-left py-3 px-4">Tanggal</th>
                {/* <th className="text-left py-3 px-4">Kategori</th> */}
                <th className="text-left py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {beritaList.map((berita) => (
                <tr
                  key={berita.id}
                  className="border-b border-gray-200 hover:bg-gray-50 rounded-lg"
                >
                  <td className="py-3 px-4">{berita.id}</td>
                  <td className="py-3 px-4">{berita.berita_judul}</td>
                  {/* <td className="py-3 px-4 max-w-xs">
                    <span title={berita.berita_isi} className="block truncate">
                      {berita.berita_isi.substring(0, 70)}
                      {berita.berita_isi.length > 70 ? "..." : ""}
                    </span>
                  </td> */}
                  {/* <td className="py-3 px-2">
                    {berita.berita_foto ? (
                      <Image
                        onLoad={() =>
                          console.log(
                            `Image loaded: /storage/${berita.berita_foto}`
                          )
                        }
                        onError={() =>
                          console.error(
                            `Image failed to load. Attempted src: /storage/${berita.berita_foto}`,
                            "Raw berita_foto:",
                            berita.berita_foto
                          )
                        }
                        src={`${urlBase}/storage/${berita.berita_foto}`}
                        alt={`Foto ${berita.berita_judul}`}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <Image
                        src="/images/placeholder-berita.png"
                        alt="Tidak ada foto"
                        width={80}
                        height={80}
                        priority
                        className="rounded-md object-cover"
                      />
                    )}
                  </td> */}
                  <td className="py-3 px-4">{berita.berita_tanggal}</td>
                  {/* <td className="py-3 px-2">{berita.berita_kategori}</td> */}
                  <td className="py-3 px-4">
                    <Link
                      href={`/admin/berita/edit/${berita.id}`}
                      legacyBehavior
                    >
                      <a className="text-blue-600 hover:underline mr-2">Edit</a>
                    </Link>
                    <button
                      onClick={() => handleDelete(berita.id)}
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

      {beritaList.length > 0 && totalPages > 1 && (
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

export default AdminBeritaPage;
