"use client"

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePublic } from "@/contexts/PublicContext";
import LoadingSpinner from "./ui/LoadingSpinner"; // Asumsi path ini benar

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const Anggota: React.FC = () => {
  const { landingPageData, fetchLandingPageComponents, loading, error } = usePublic();

  useEffect(() => {
    // Hanya fetch jika data untuk section 'anggota' belum ada
    if (!landingPageData.anggota) {
      fetchLandingPageComponents();
    }
  }, [landingPageData.anggota, fetchLandingPageComponents]);

  const anggotaContent = landingPageData.anggota;

  // Mengambil data dengan fallback ke nilai default
  const title = anggotaContent?.title?.value || "Bergabunglah dengan Jaringan Pengusaha Muda Terdepan";
  // Deskripsi bisa jadi satu blok teks atau dipecah jika perlu
  const description = anggotaContent?.description?.value || 
    `HIPMI Kota Cirebon adalah wadah bagi para pengusaha muda untuk
    bertumbuh, berkolaborasi, dan berkontribusi. Sebagai anggota, Anda
    akan mendapatkan akses ke berbagai program pengembangan diri,
    jaringan bisnis yang luas, serta kesempatan untuk terlibat dalam
    advokasi kebijakan yang mendukung ekosistem wirausaha.
    <br/><br/>
    Kami percaya bahwa kekuatan kolektif akan membawa dampak positif
    yang lebih besar. Mari bersama-sama membangun masa depan ekonomi
    yang lebih baik melalui inovasi dan semangat kewirausahaan.`;
  
  const buttonText = anggotaContent?.button_text?.value || "Pelajari Lebih Lanjut & Daftar";
  const buttonLink = anggotaContent?.button_link?.value || "#kontak"; // Atau link ke halaman pendaftaran
  const imageUrl = anggotaContent?.image?.value ? `${urlBase}/storage/${anggotaContent.image.value}` : "/assets/placeholder.jpg";
  const imageAlt = anggotaContent?.image?.key_name || "Jaringan Kolaborasi HIPMI";

  if (loading && !anggotaContent) {
    return (
      <section id="keanggotaan" className="container mx-auto px-4 bg-white py-16 md:py-24 flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section
      id="keanggotaan"
      className="container mx-auto px-4 bg-white py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 lg:gap-y-0 items-center">
          {/* Kolom Kiri: Penjelasan Keanggotaan */}
          <div className="lg:pr-8">
            <h2 className="text-3xl md:text-4xl font-bold text-textcolor mb-6" dangerouslySetInnerHTML={{ __html: title }} />
            <div 
              className="text-gray-700 leading-relaxed mb-6 prose prose-slate max-w-none" 
              dangerouslySetInnerHTML={{ __html: description }} 
            />
            <Link href={buttonLink} legacyBehavior>
            <a
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              {buttonText}
            </a>
            </Link>
          </div>

          {/* Kolom Kanan: Logo Perusahaan Anggota */}
          <div className="flex items-center justify-center lg:pl-8">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                priority={false} // Set priority ke false jika bukan gambar LCP
              />
              {/* Anda bisa menambahkan overlay teks di atas gambar jika mau */}
              <div className="absolute inset-0 bg-black/10 flex items-end p-6">
                {/* <h4 className="text-white text-xl font-semibold">Jaringan Kuat, Dampak Besar</h4> */}
              </div>
            </div>
          </div>
        </div>
        {error && !loading && !anggotaContent && (
          <p className="text-center text-red-500 mt-8">Gagal memuat konten Keanggotaan: {error}</p>
        )}
        {/* Tombol/Panel "Lihat Semua Anggota" yang lebih menarik */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link href="/keanggotaan" legacyBehavior>
            <a
              className="group inline-block px-8 py-4 bg-gradient-to-r from-secondary to-accent text-white 
                         rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out
                         focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <span className="text-lg font-semibold">Lihat Semua Anggota Kami &rarr;</span>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Anggota;
