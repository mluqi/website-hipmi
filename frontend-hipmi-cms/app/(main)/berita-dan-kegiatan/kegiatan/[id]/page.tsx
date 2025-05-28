// /Users/mohammadluqi/Work/Palindo/Hipmi/frontend-hipmi-cms/app/(main)/kegiatan/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { usePublic } from "@/contexts/PublicContext";
import type { KegiatanItem } from "@/contexts/PublicContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  FaCalendarAlt,
  FaClock,
  FaTags,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const imageStorageBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000/storage/";

const KegiatanDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const {
    fetchKegiatanById,
    loading: contextLoading,
    error: contextError,
  } = usePublic();
  const [kegiatan, setKegiatan] = useState<KegiatanItem | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  const kegiatanId = React.useMemo(
    () => (params.id ? parseInt(params.id as string, 10) : null),
    [params.id]
  );

  useEffect(() => {
    if (kegiatanId !== null) {
      const loadKegiatan = async () => {
        setPageLoading(true);
        setPageError(null);
        try {
          const data = await fetchKegiatanById(kegiatanId);
          if (data) {
            setKegiatan(data);
          } else {
            setPageError(
              contextError ||
                `Kegiatan dengan ID ${kegiatanId} tidak ditemukan.`
            );
            setKegiatan(null);
          }
        } catch (err) {
          console.error("Failed to fetch kegiatan detail:", err);
          setPageError("Gagal memuat detail kegiatan.");
        } finally {
          setPageLoading(false);
        }
      };
      loadKegiatan();
    } else {
      setPageError("ID Kegiatan tidak valid.");
      setPageLoading(false);
    }
  }, [kegiatanId, fetchKegiatanById, contextError]);

  if (
    pageLoading ||
    (contextLoading && !kegiatan && !pageError && kegiatanId !== null)
  ) {
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
          Kegiatan tidak ditemukan
        </h1>
        <p className="text-gray-600 mt-2">{pageError}</p>
        <button
          onClick={() => router.back()}
          className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <IoArrowBack className="mr-2" /> Kembali
        </button>
      </div>
    );
  }

  if (!kegiatan) {
    return (
      <div className="container mx-auto px-4 py-40 text-center">
        <p>Data kegiatan tidak tersedia.</p>
        <button
          onClick={() => router.back()}
          className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <IoArrowBack className="mr-2" /> Kembali
        </button>
      </div>
    );
  }

  return (
    <main className="bg-slate-50 pt-28 md:pt-36 pb-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center text-sm font-medium text-textcolor hover:text-textcolor/80"
        >
          <IoArrowBack className="mr-2 text-lg" /> Kembali
        </button>
        <article className="bg-white rounded-xl shadow-xl overflow-hidden">
          {kegiatan.kegiatan_foto && (
            <div className="relative w-full h-full md:h-96">
              <Image
                src={`${imageStorageBaseUrl}${kegiatan.kegiatan_foto}`}
                alt={kegiatan.kegiatan_judul}
                fill
                priority
                className="transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
          )}

          <div className="p-6 md:p-10">
            {kegiatan.kegiatan_kategori && (
              <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {kegiatan.kegiatan_kategori}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-textcolor mb-5 leading-tight">
              {kegiatan.kegiatan_judul}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-600 mb-8 border-t border-b border-gray-200 py-6">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-3 text-lg text-primary flex-shrink-0" />
                <div>
                  <span className="font-semibold block text-textcolor">
                    Tanggal Kegiatan
                  </span>
                  {new Date(kegiatan.kegiatan_tanggal).toLocaleDateString(
                    "id-ID",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-3 text-lg text-primary flex-shrink-0" />
                <div>
                  <span className="font-semibold block text-textcolor">
                    Waktu
                  </span>
                  {kegiatan.kegiatan_waktu}
                </div>
              </div>
              {/* Contoh jika ada data lokasi */}
              {kegiatan.kegiatan_lokasi && (
                <div className="flex items-center sm:col-span-2">
                  <FaMapMarkerAlt className="mr-3 text-lg text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold block text-textcolor">
                      Lokasi
                    </span>
                    {kegiatan.kegiatan_lokasi}
                  </div>
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold text-textcolor mb-3 mt-6">
              Deskripsi Kegiatan
            </h2>
            <div
              className="prose prose-slate lg:prose-lg max-w-none text-textcolor"
              dangerouslySetInnerHTML={{ __html: kegiatan.kegiatan_isi }}
            />
          </div>
        </article>
      </div>
    </main>
  );
};

export default KegiatanDetailPage;
