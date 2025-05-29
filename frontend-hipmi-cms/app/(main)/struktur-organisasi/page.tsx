"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { usePublic } from "@/contexts/PublicContext";
import { AnggotaItem, PaginatedApiResponse } from "@/contexts/PublicContext";
import { Button } from "@/components/ui/button";

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://dev3-p3.palindo.id/storage/";

const StrukturOrganisasi = () => {
  const {
    anggotaList,
    fetchAnggota,
    loading,
    error,
    anggotaCurrentPage,
    anggotaTotalPages,
    anggotaTotalItems,
    anggotaItemsPerPage,
  } = usePublic();

  useEffect(() => {
    fetchAnggota(1, anggotaItemsPerPage || 12);
  }, [fetchAnggota, anggotaItemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= anggotaTotalPages) {
      fetchAnggota(newPage, anggotaItemsPerPage);
    }
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Header Halaman */}
      <div className="relative bg-gradient-to-br from-accent to-secondary text-white py-20 md:py-28 text-center pt-32 md:pt-44">
        <div
          className="absolute inset-0 z-0 bg-[url('/assets/patterns/geometric-lines.svg')] bg-repeat opacity-10"
          aria-hidden="true"
        ></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Struktur Organisasi Lengkap
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Kenali lebih dekat jajaran pengurus HIPMI Kota Cirebon yang
            berdedikasi untuk memajukan pengusaha muda.
          </p>
        </div>
      </div>

      {/* Bagian Visual Struktur Organisasi */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-textcolor mb-12 md:mb-16 text-center">
            Jajaran Pengurus
          </h2>

          {loading && (
            <p className="text-center text-gray-600 text-lg">
              Memuat data pengurus...
            </p>
          )}
          {error && (
            <p className="text-center text-red-500 text-lg">
              Gagal memuat data: {error}
            </p>
          )}

          {!loading && !error && anggotaList.length === 0 && (
            <p className="text-center text-gray-600 text-lg">
              Belum ada data pengurus untuk ditampilkan.
            </p>
          )}

          {!loading && !error && anggotaList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
              {anggotaList.map((member: AnggotaItem) => {
                const photoUrl = member.anggota_foto
                  ? `${baseUrl}${member.anggota_foto}`
                  : "/assets/no-profile.png";

                return (
                  <div key={member.id} className="text-center group">
                    <div className="relative w-36 h-36 md:w-40 md:h-40 mx-auto mb-4 overflow-hidden rounded-full shadow-lg">
                      <Image
                        src={photoUrl}
                        alt={member.anggota_nama}
                        fill
                        sizes="(max-width: 768px) 144px, 160px"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) =>
                          (e.currentTarget.src = "/assets/no-profile.png")
                        }
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-16">
                        {member.anggota_facebook && (
                          <a
                            href={member.anggota_facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-accent transition-colors"
                          >
                            <FaFacebookF size={20} />
                          </a>
                        )}
                        {member.anggota_instagram && (
                          <a
                            href={member.anggota_instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-accent transition-colors"
                          >
                            <FaInstagram size={20} />
                          </a>
                        )}
                        {member.anggota_linkedin && (
                          <a
                            href={member.anggota_linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-accent transition-colors"
                          >
                            <FaLinkedinIn size={20} />
                          </a>
                        )}
                        {member.anggota_tiktok && (
                          <a
                            href={member.anggota_tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-accent transition-colors"
                          >
                            <FaTiktok size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-textcolor mb-1">
                      {member.anggota_nama}
                    </h3>
                    <p className="text-sm text-secondary group-hover:text-secondary transition-colors duration-300 px-2">
                      {member.anggota_jabatan_nama || "Anggota"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Tabel Detail Jabatan dan Nama */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-textcolor mb-10 md:mb-12 text-center">
            Daftar Lengkap Pengurus
          </h2>
          {loading && (
            <p className="text-center text-gray-600">
              Memuat daftar pengurus...
            </p>
          )}
          {error && (
            <p className="text-center text-red-500">
              Gagal memuat daftar: {error}
            </p>
          )}
          {!loading && !error && (
            <div className="bg-white rounded-xl shadow-xl overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Jabatan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bidang/Departemen
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {anggotaList.map((member: AnggotaItem, index) => (
                    <tr
                      key={member.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(anggotaCurrentPage - 1) * anggotaItemsPerPage +
                          index +
                          1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-textcolor">
                        {member.anggota_nama}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {member.anggota_jabatan_nama || "Anggota"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {member.anggota_bidang_nama || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {anggotaList.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  Belum ada data pengurus untuk ditampilkan.
                </p>
              )}
            </div>
          )}
          {/* Pagination Controls */}
          {!loading &&
            !error &&
            anggotaList.length > 0 &&
            anggotaTotalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-700">
                  Menampilkan{" "}
                  <span className="font-medium">
                    {(anggotaCurrentPage - 1) * anggotaItemsPerPage + 1}
                  </span>{" "}
                  -{" "}
                  <span className="font-medium">
                    {(anggotaCurrentPage - 1) * anggotaItemsPerPage +
                      anggotaList.length}
                  </span>{" "}
                  dari <span className="font-medium">{anggotaTotalItems}</span>{" "}
                  pengurus
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handlePageChange(anggotaCurrentPage - 1)}
                    disabled={anggotaCurrentPage === 1}
                    variant="outline"
                    size="sm"
                    className="bg-secondary"
                  >
                    Sebelumnya
                  </Button>
                  <Button
                    onClick={() => handlePageChange(anggotaCurrentPage + 1)}
                    disabled={anggotaCurrentPage === anggotaTotalPages}
                    variant="outline"
                    size="sm"
                    className="bg-secondary"
                  >
                    Berikutnya
                  </Button>
                </div>
              </div>
            )}
        </div>
      </section>
    </main>
  );
};

export default StrukturOrganisasi;
