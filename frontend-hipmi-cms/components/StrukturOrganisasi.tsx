"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { usePublic } from "@/contexts/PublicContext";
import { AnggotaItem } from "@/contexts/PublicContext";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev3-p3.palindo.id"; // Gunakan variabel environment yang konsisten
const storageBaseUrl = `${API_URL}/storage/`;

const StrukturOrganisasi = () => {
  const router = useRouter();

  const handleChangePage = () => {
    router.push("/struktur-organisasi");
  };

  const { anggotaList, fetchAnggota, loading, error } = usePublic();

  useEffect(() => {
    fetchAnggota();
  }, [fetchAnggota]);

  const displayedMembers = anggotaList.slice(0, 6);

  return (
    <section id="struktur-organisasi" className="bg-slate-50 py-16 md:py-24"> {/* Pastikan ID unik jika digunakan untuk scroll anchor */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-textcolor">
            Struktur Organisasi
          </h2>
          <p className="text-gray-600 mt-2 md:text-lg">
            Kenali tim inti yang menggerakkan HIPMI Kota Cirebon.
          </p>
        </div>

        {loading && (
          <p className="text-center text-gray-600">Memuat data anggota...</p>
        )}
        {error && (
          <p className="text-center text-red-500">Gagal memuat data: {error}</p>
        )}

        {!loading && !error && displayedMembers.length === 0 && (
          <p className="text-center text-gray-600">Belum ada data anggota.</p>
        )}

        {!loading && !error && displayedMembers.length > 0 && (
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
            {displayedMembers.map((member: AnggotaItem) => {
              const photoUrl = member.anggota_foto
                ? `${storageBaseUrl}${member.anggota_foto}`
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
                    {/* Overlay untuk ikon media sosial */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-20">
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
                  <p className="text-sm text-secondary group-hover:text-secondary transition-colors duration-300">
                    {member.anggota_jabatan_nama || "Anggota"}{" "}
                    {/* Fallback if jabatan_nama is not available */}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="items-center justify-center flex mt-20">
        <Button
          onClick={handleChangePage}
          className="bg-accent text-textcolor hover:bg-accent hover:text-white transition duration-300 text-center"
        >
          Lihat Selengkapnya
        </Button>
      </div>
    </section>
  );
};

export default StrukturOrganisasi;
