"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { usePublic } from "@/contexts/PublicContext";
import LoadingSpinner from "./ui/LoadingSpinner"; // Asumsi path ini benar

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const urlBase =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev3-p3.palindo.id";

const PhotoSlide = () => {
  const { landingPageData, fetchLandingPageComponents, loading, error } =
    usePublic();

  useEffect(() => {
    if (!landingPageData.photoslide) {
      fetchLandingPageComponents();
    }
  }, [landingPageData.photoslide, fetchLandingPageComponents]);

  // Ekstrak slide images dari context. Asumsi key_name adalah slide_1, slide_2, dst.
  const slideImages = landingPageData.photoslide
    ? Object.values(landingPageData.photoslide)
        .filter((item) => item.type === "image" && item.value) // Ambil hanya item gambar yang punya value
        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) // Urutkan berdasarkan sort_order
        .map((item) => ({
          id: item.id,
          src: `${urlBase}/storage/${item.value}`,
          alt: item.key_name, // Atau field lain jika Anda punya untuk alt text
        }))
    : [];

  if (loading && slideImages.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-slate-100 flex justify-center items-center min-h-[300px]">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true} // Menampilkan tombol navigasi (prev/next)
          breakpoints={{
            // Responsive breakpoints
            640: {
              // sm
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              // lg
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="mySwiper h-[300px] md:h-[400px] rounded-lg"
        >
          {slideImages.length > 0
            ? slideImages.map((image) => (
                <SwiperSlide
                  key={image.id}
                  className="rounded-lg overflow-hidden"
                >
                  <Image
                    src={image.src}
                    alt={image.alt || `Slide ${image.id}`}
                    fill
                    className="object-cover"
                  />
                </SwiperSlide>
              ))
            : !loading && (
                <div className="text-center text-gray-500 p-10">
                  Tidak ada gambar untuk ditampilkan.
                </div>
              )}
        </Swiper>
        {error && !loading && slideImages.length === 0 && (
          <p className="text-center text-red-500 mt-4">
            Gagal memuat gambar slide: {error}
          </p>
        )}
      </div>
    </section>
  );
};

export default PhotoSlide;
