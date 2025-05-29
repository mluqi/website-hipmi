"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { usePublic } from "@/contexts/PublicContext";
import type { AnggotaItem } from "@/contexts/PublicContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
  FaBuilding,
  FaUserTie,
} from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const imageStorageBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://dev3-p3.palindo.id/storage/";

const AnggotaDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { fetchAnggotaById } = usePublic();
  const [anggota, setAnggota] = useState<AnggotaItem | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  const anggotaId = params.id ? parseInt(params.id as string) : null;

  useEffect(() => {
    const loadAnggota = async () => {
      if (!anggotaId) {
        setPageError("ID Anggota tidak valid.");
        setPageLoading(false);
        return;
      }

      try {
        setPageLoading(true);
        setPageError(null);

        const data = await fetchAnggotaById(anggotaId);

        if (data) {
          setAnggota(data);
        } else {
          setPageError(`Anggota dengan ID ${anggotaId} tidak ditemukan.`);
        }
      } catch (err) {
        console.error("Failed to fetch anggota detail:", err);
        setPageError("Gagal memuat detail anggota.");
      } finally {
        setPageLoading(false);
      }
    };

    loadAnggota();
  }, [anggotaId, fetchAnggotaById]);

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen py-40">
        <LoadingSpinner />
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="container mx-auto px-4 py-40 text-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Anggota tidak ditemukan
        </h1>
        <p className="text-textcolor mt-2">{pageError}</p>
        <button
          onClick={() => router.back()}
          className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <IoArrowBack className="mr-2" /> Kembali
        </button>
      </div>
    );
  }

  if (!anggota) {
    return (
      <div className="container mx-auto px-4 py-40 text-center">
        <p>Data anggota tidak tersedia.</p>
        <button
          onClick={() => router.back()}
          className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <IoArrowBack className="mr-2" /> Kembali
        </button>
      </div>
    );
  }

  const socialLinks = [
    {
      icon: FaInstagram,
      url: anggota.anggota_instagram,
      color: "text-pink-600 hover:text-pink-700",
    },
    {
      icon: FaFacebook,
      url: anggota.anggota_facebook,
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      icon: FaLinkedin,
      url: anggota.anggota_linkedin,
      color: "text-sky-700 hover:text-sky-800",
    },
    {
      icon: FaTiktok,
      url: anggota.anggota_tiktok,
      color: "text-black hover:text-gray-700",
    },
  ].filter((link) => link.url);

  return (
    <main className="bg-slate-100 pt-28 md:pt-36 pb-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center text-sm font-medium text-textcolor hover:text-textcolor/80"
        >
          <IoArrowBack className="mr-2 text-lg" /> Kembali ke Daftar Anggota
        </button>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Kolom Kiri: Foto & Info Kontak */}
            <div className="md:w-1/3 bg-gradient-to-br from-secondary to-accent p-6 md:p-8 text-white flex flex-col items-center">
              <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
                <Image
                  src={
                    anggota.anggota_foto
                      ? `${imageStorageBaseUrl}${anggota.anggota_foto}`
                      : "/assets/avatar-placeholder.png"
                  }
                  alt={`Foto ${anggota.anggota_nama}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                  priority
                />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-center mb-1">
                {anggota.anggota_nama}
              </h1>
              <p className="text-center text-white/80 mb-4">
                {anggota.anggota_jabatan_nama}
              </p>

              <div className="space-y-2 text-sm w-full">
                {anggota.anggota_telepon && (
                  <div className="flex items-center">
                    <FaPhone className="mr-2.5 flex-shrink-0" />{" "}
                    <span>{anggota.anggota_telepon}</span>
                  </div>
                )}
                {anggota.anggota_email && (
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2.5 flex-shrink-0" />{" "}
                    <span>{anggota.anggota_email}</span>
                  </div>
                )}
              </div>

              {socialLinks.length > 0 && (
                <div className="mt-6 flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={
                        social.url?.startsWith("http")
                          ? social.url
                          : `https://${social.url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-white hover:text-white/80 transition-colors`}
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Kolom Kanan: Detail Perusahaan & Pengalaman */}
            <div className="md:w-2/3 p-6 md:p-8">
              <section id="info-perusahaan" className="mb-8">
                <h2 className="text-xl font-semibold text-textcolor mb-4 border-b pb-2">
                  Informasi Perusahaan
                </h2>
                <div className="space-y-3 text-gray-700">
                  {anggota.anggota_perusahaan && (
                    <div className="flex items-start">
                      <FaBuilding className="mr-3 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <span className="font-medium block text-textcolor">
                          {anggota.anggota_perusahaan}
                        </span>
                        <span className="text-xs text-gray-500">
                          Nama Perusahaan
                        </span>
                      </div>
                    </div>
                  )}
                  {anggota.anggota_bidang && (
                    <div className="flex items-start">
                      <FaUserTie className="mr-3 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <span className="font-medium block text-textcolor">
                          {anggota.anggota_bidang_nama}
                        </span>
                        <span className="text-xs text-gray-500">
                          Bidang Usaha
                        </span>
                      </div>
                    </div>
                  )}
                  {anggota.anggota_perusahaan_alamat && (
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="mr-3 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <span className="font-medium block text-textcolor">
                          {anggota.anggota_perusahaan_alamat}
                        </span>
                        <span className="text-xs text-gray-500">
                          Alamat Perusahaan
                        </span>
                      </div>
                    </div>
                  )}
                  {anggota.anggota_perusahaan_website && (
                    <div className="flex items-start">
                      <FaGlobe className="mr-3 mt-1 text-primary flex-shrink-0" />
                      <div>
                        <a
                          href={
                            anggota.anggota_perusahaan_website.startsWith(
                              "http"
                            )
                              ? anggota.anggota_perusahaan_website
                              : `https://${anggota.anggota_perusahaan_website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-textcolor hover:text-primary hover:underline"
                        >
                          {anggota.anggota_perusahaan_website}
                        </a>
                        <span className="text-xs text-gray-500 block">
                          Website Perusahaan
                        </span>
                      </div>
                    </div>
                  )}
                  {anggota.anggota_perusahaan_logo && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Logo Perusahaan:
                      </h3>
                      <div className="relative w-32 h-32 bg-slate-100 p-2 rounded border">
                        <Image
                          src={`${imageStorageBaseUrl}${anggota.anggota_perusahaan_logo}`}
                          alt={`Logo ${anggota.anggota_perusahaan}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section id="pengalaman">
                <h2 className="text-xl font-semibold text-textcolor mb-4 border-b pb-2">
                  Pengalaman
                </h2>
                <div
                  className="prose prose-slate lg:prose-xl max-w-none text-textcolor mt-6"
                  dangerouslySetInnerHTML={{
                    __html: anggota.anggota_pengalaman,
                  }}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnggotaDetailPage;
