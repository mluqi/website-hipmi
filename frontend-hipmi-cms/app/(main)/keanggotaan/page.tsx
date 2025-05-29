"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { usePublic } from "@/contexts/PublicContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const imageStorageBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://dev3-p3.palindo.id/storage/";

const KeanggotaanPage = () => {
  const {
    anggotaList,
    loading,
    error,
    fetchAnggota,
    anggotaCurrentPage,
    anggotaTotalPages,
    anggotaItemsPerPage,
  } = usePublic();

  const [localCurrentPage, setLocalCurrentPage] = useState(1);

  useEffect(() => {
    fetchAnggota(localCurrentPage, anggotaItemsPerPage);
  }, [fetchAnggota, localCurrentPage, anggotaItemsPerPage]);

  const handleNextPage = () => {
    if (anggotaCurrentPage < anggotaTotalPages) {
      setLocalCurrentPage(anggotaCurrentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (anggotaCurrentPage > 1) {
      setLocalCurrentPage(anggotaCurrentPage - 1);
    }
  };
  if (loading && anggotaList.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-40 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Header Halaman */}
      <div className="relative bg-gradient-to-br from-accent to-secondary text-white py-20 md:py-28 text-center pt-32 md:pt-48">
        <div
          className="absolute inset-0 z-0 bg-[url('/assets/patterns/geometric-lines.svg')] bg-repeat opacity-10"
          aria-hidden="true"
        ></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Keanggotaan Kami
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Jelajahi jaringan perusahaan anggota HIPMI Kota Cirebon yang beragam
            dan dinamis.
          </p>
        </div>
      </div>

      {/* Konten Daftar Logo Anggota */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-textcolor mb-8 md:mb-10 text-center">
              Mitra dan Anggota Kebanggaan Kami
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {anggotaList.map((anggota) => {
                const content = (
                  <div className="bg-slate-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
                    <div className="relative w-full h-40 bg-slate-200 flex items-center justify-center p-4">
                      <Image
                        src={
                          anggota.anggota_perusahaan_logo
                            ? `${imageStorageBaseUrl}${anggota.anggota_perusahaan_logo}`
                            : "/assets/placeholder.jpg"
                        }
                        alt={`Logo ${
                          anggota.anggota_perusahaan || anggota.anggota_nama
                        }`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className="max-h-full max-w-full object-contain" // Tambahkan object-contain jika diperlukan
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3
                        className="text-lg font-semibold text-textcolor mb-2 truncate"
                        title={
                          anggota.anggota_perusahaan || anggota.anggota_nama
                        }
                      >
                        {anggota.anggota_perusahaan || anggota.anggota_nama}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">
                        {anggota.anggota_jabatan_nama}
                      </p>
                      {anggota.anggota_perusahaan_alamat && (
                        <div className="flex items-start text-sm text-gray-600 mb-1">
                          <FaMapMarkerAlt className="text-secondary mr-2 mt-1 flex-shrink-0" />
                          <p className="line-clamp-2">
                            {anggota.anggota_perusahaan_alamat}
                          </p>
                        </div>
                      )}
                      {anggota.anggota_perusahaan_website && (
                        <div className="flex items-center text-sm text-gray-600 mt-auto pt-2">
                          <FaGlobe className="text-secondary mr-2 flex-shrink-0" />
                          <Link
                            href={
                              anggota.anggota_perusahaan_website.startsWith(
                                "http"
                              )
                                ? anggota.anggota_perusahaan_website
                                : `https://${anggota.anggota_perusahaan_website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-textcolor hover:underline truncate hover:text-primary"
                            onClick={(e) => e.stopPropagation()} // Prevent Link navigation if card is wrapped in Link
                          >
                            Kunjungi Website
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );

                return (
                  <Link
                    href={`/keanggotaan/${anggota.id}`}
                    key={anggota.id}
                    className="block group"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
            {loading && anggotaList.length > 0 && (
              <div className="flex justify-center mt-8">
                <LoadingSpinner />
              </div>
            )}
            {anggotaList.length === 0 && !loading && !error && (
              <p className="text-center text-gray-500 mt-8">
                Belum ada data anggota perusahaan untuk ditampilkan.
              </p>
            )}
            {anggotaList.length > 0 && anggotaTotalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-4">
                <button
                  onClick={handlePrevPage}
                  disabled={anggotaCurrentPage <= 1 || loading}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sebelumnya
                </button>
                <span className="text-gray-700">
                  Halaman {anggotaCurrentPage} dari {anggotaTotalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={anggotaCurrentPage >= anggotaTotalPages || loading}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Berikutnya
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default KeanggotaanPage;
