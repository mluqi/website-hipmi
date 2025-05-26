"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useKegiatan } from "@/contexts/KegiatanContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const AdminKegiatanPage = () => {
  const {
    kegiatanList,
    isLoading,
    error,
    fetchKegiatanList,
    deleteKegiatan,
    clearError,
  } = useKegiatan();

  useEffect(() => {
    fetchKegiatanList();
  }, [fetchKegiatanList]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
      await deleteKegiatan(id);
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
            fetchKegiatanList();
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
        <h1 className="text-2xl font-bold text-textcolor">Manajemen Kegiatan</h1>
        <Link href="/admin/kegiatan/tambah" legacyBehavior>
          <a className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90">
            Tambah Kegiatan
          </a>
        </Link>
      </div>

      {kegiatanList.length === 0 ? (
        <p className="text-center text-textcolor">Belum ada kegiatan.</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg text-textcolor">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">Judul</th>
              {/* <th className="text-left py-3 px-4 max-w-xs">Isi (Cuplikan)</th> */}
              {/* <th className="text-left py-3 px-4">Foto</th> */}
              <th className="text-left py-3 px-4">Tanggal</th>
              {/* <th className="text-left py-3 px-4">Waktu</th> */}
              {/* <th className="text-left py-3 px-4">Kategori</th> */}
              {/* <th className="text-left py-3 px-4">Lokasi</th> */}
              <th className="text-left py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kegiatanList.map((kegiatan) => (
              <tr
                key={kegiatan.id}
                className="border-b border-gray-200 hover:bg-gray-50 rounded-lg"
              >
                <td className="py-3 px-4">{kegiatan.id}</td>
                <td className="py-3 px-4">{kegiatan.kegiatan_judul}</td>
                {/* <td className="py-3 px-4 max-w-xs">
                  <span title={kegiatan.kegiatan_isi} className="block truncate">
                    {kegiatan.kegiatan_isi.substring(0, 70)}
                    {kegiatan.kegiatan_isi.length > 70 ? "..." : ""}
                  </span>
                </td> */}
                {/* <td className="py-3 px-4">
                  {kegiatan.kegiatan_foto ? (
                    <Image
                      src={`${urlBase}/storage/${kegiatan.kegiatan_foto}`}
                      alt={`Foto ${kegiatan.kegiatan_judul}`}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <Image
                      src="/assets/placeholder.jpg" 
                      alt="Tidak ada foto"
                      width={80}
                      height={80}
                      className="rounded-md object-cover bg-slate-200"
                    />
                  )}
                </td> */}
                <td className="py-3 px-4">{new Date(kegiatan.kegiatan_tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                {/* <td className="py-3 px-4">{kegiatan.kegiatan_waktu.substring(0,5)}</td> */}
                {/* <td className="py-3 px-4">{kegiatan.kegiatan_kategori}</td> */}
                {/* <td className="py-3 px-4">{kegiatan.kegiatan_lokasi}</td> */}
                <td className="py-3 px-4">
                  <Link
                    href={`/admin/kegiatan/edit/${kegiatan.id}`}
                    legacyBehavior
                  >
                    <a className="text-blue-600 hover:underline mr-2">Edit</a>
                  </Link>
                  <button
                    onClick={() => handleDelete(kegiatan.id)}
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
    </div>
  );
};

export default AdminKegiatanPage;