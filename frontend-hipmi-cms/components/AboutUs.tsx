"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { usePublic } from "@/contexts/PublicContext";
import LoadingSpinner from "./ui/LoadingSpinner"; // Asumsi path ini benar

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const AboutUs = () => {
  const { landingPageData, fetchLandingPageComponents, loading, error } =
    usePublic();

  useEffect(() => {
    // Hanya fetch jika data untuk section 'aboutus' belum ada
    if (!landingPageData.aboutus) {
      fetchLandingPageComponents();
    }
  }, [landingPageData.aboutus, fetchLandingPageComponents]);

  const aboutUsContent = landingPageData.aboutus;
  const title = aboutUsContent?.title?.value || "HIPMI KOTA CIREBON";
  const subtitle =
    aboutUsContent?.subtitle?.value || "Himpunan Pengusaha Muda Indonesia"; // Jika Anda menambahkan subtitle
  const textContent =
    aboutUsContent?.text?.value ||
    "Konten default tentang HIPMI Kota Cirebon...";
  const imageUrl = aboutUsContent?.image?.value
    ? `${urlBase}/storage/${aboutUsContent.image.value}`
    : "/assets/placeholder.jpg";
  const imageAlt = aboutUsContent?.image?.key_name || "Logo HIPMI Kota Cirebon";

  if (loading && !aboutUsContent) {
    return (
      <section
        id="about"
        className="container mx-auto py-20 md:py-60 flex justify-center items-center min-h-[300px]"
      >
        <LoadingSpinner />
      </section>
    );
  }

  if (error && !aboutUsContent) {
    return (
      <section
        id="about"
        className="container mx-auto py-20 md:py-60 text-center text-red-500"
      >
        <p>Gagal memuat konten About Us: {error}</p>
      </section>
    );
  }

  return (
    <section id="about" className="container mx-auto py-20 md:py-60">
      <div
        className="bg-white text-textcolor 
                        grid grid-cols-1 items-center gap-y-8 p-6
                        lg:grid-cols-2 lg:gap-x-10 lg:p-8"
      >
        {/* Blok Konten Teks */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold text-textcolor mb-3 md:text-4xl">
            {title}
          </h1>
          <h3 className="text-xl font-medium text-secondary mb-4 md:text-2xl">
            {subtitle}
          </h3>
          <div
            className="text-gray-600 mt-2 text-sm md:text-base prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        </div>
        {/* Blok Gambar */}
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={500}
          height={500}
          className="order-1 lg:order-2 w-30 h-auto object-contain justify-self-center lg:justify-self-end"
          priority
        />
      </div>
    </section>
  );
};

export default AboutUs;
