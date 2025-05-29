"use client"; // Karena kita akan menggunakan hooks (useContext, useEffect, useState)

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePublic } from "@/contexts/PublicContext"; // Impor usePublic
import LoadingSpinner from "@/components/ui/LoadingSpinner"; // Impor LoadingSpinner

const urlBase =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev3-p3.palindo.id";

const Sejarah = () => {
  const {
    sejarahData,
    fetchSejarah,
    loading: contextLoading,
    error: contextError,
  } = usePublic();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (!sejarahData) {
        // Hanya fetch jika data belum ada di context
        await fetchSejarah();
      }
      setIsLoading(false);
    };
    loadData();
  }, [fetchSejarah, sejarahData]);

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Header Halaman */}
      <div className="relative bg-gradient-to-br from-accent to-secondary text-white py-20 md:py-28 text-center pt-32 md:pt-44">
        <div
          className="absolute inset-0 z-0 bg-[url('/assets/patterns/geometric-lines.svg')] bg-repeat opacity-10"
          aria-hidden="true"
        ></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sejarah HIPMI</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Menelusuri jejak langkah Himpunan Pengusaha Muda Indonesia dalam
            membangun ekosistem wirausaha dan mencetak pemimpin ekonomi bangsa.
          </p>
        </div>
      </div>

      {/* Konten Sejarah */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {isLoading || contextLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <LoadingSpinner />
            </div>
          ) : contextError ? (
            <div className="text-center text-red-500">
              <p>Gagal memuat data sejarah: {contextError}</p>
              <button
                onClick={async () => {
                  setIsLoading(true);
                  await fetchSejarah();
                  setIsLoading(false);
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Coba Lagi
              </button>
            </div>
          ) : sejarahData ? (
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Kolom Gambar (Kiri di LG, Atas di SM) */}
                <div className="order-1 lg:order-1">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={
                        sejarahData.sejarah_foto
                          ? `${urlBase}/storage/${sejarahData.sejarah_foto}`
                          : "/assets/placeholder.jpg"
                      }
                      alt={
                        sejarahData.sejarah_foto
                          ? "Sejarah HIPMI"
                          : "Placeholder Sejarah"
                      }
                      fill
                      sizes="100vw"
                      priority
                      className="object-cover"
                    />
                  </div>
                  {sejarahData.sejarah_foto && (
                    <p className="text-xs text-gray-500 mt-2 text-center italic">
                      Foto Sejarah HIPMI
                    </p>
                  )}
                </div>

                {/* Kolom Teks (Kanan di LG, Bawah di SM) */}
                <div className="order-2 lg:order-2 prose prose-slate max-w-none lg:prose-lg">
                  {/* Menggunakan dangerouslySetInnerHTML untuk merender HTML dari ReactQuill */}
                  {/* Pastikan konten dari backend sudah di-sanitize untuk mencegah XSS */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sejarahData.sejarah_konten,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>Data sejarah tidak ditemukan.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Sejarah;
