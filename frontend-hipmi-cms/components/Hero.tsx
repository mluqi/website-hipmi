"use client";

import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CountUp from "./CountUp/CountUp";
import { usePublic } from "@/contexts/PublicContext";
import BlurText from "./BlurText/BlurText";
import SplitText from "./SplitText/SplitText";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./ui/LoadingSpinner"; 

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const Hero = () => {
  const { landingPageData, fetchLandingPageComponents, loading, error } = usePublic();

  useEffect(() => {
    if (!landingPageData.hero) {
      fetchLandingPageComponents();
    }
  }, [landingPageData.hero, fetchLandingPageComponents]);

  const heroContent = landingPageData.hero;

  const images = heroContent
    ? Object.values(heroContent)
        .filter(item => item.type === 'image' && item.key_name.startsWith('image_') && item.value)
        .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
        .map(item => `${urlBase}/storage/${item.value}`)
    : ["/assets/hero1.jpg", "/assets/hero2.jpg", "/assets/hero3.jpg"];

  const mainText = "BANGKIT BERSAMA HIPMI KOTA CIREBON";
  const subText = heroContent?.text_sub?.value || "Bergabunglah bersama organisasi pengusaha muda terbesar di Indonesia";
  const buttonText = heroContent?.button_text?.value || "Gabung Sekarang";
  const buttonLink = heroContent?.button_link?.value || "/kontak";

  const infoBoxesData = [];
  if (heroContent) {
    for (let i = 1; i <= 4; i++) { 
      const titleItem = heroContent[`infobox_${i}_title`];
      const descItem = heroContent[`infobox_${i}_description`];
      if (titleItem && descItem && titleItem.value && descItem.value) {
        infoBoxesData.push({
          id: titleItem.id,
          title: parseInt(titleItem.value, 10) || 0,
          description: descItem.value,
        });
      }
    }
  } else {
    // Fallback infoboxes data
    infoBoxesData.push({ id: 1, title: 48, description: "Tahun Berdiri" }, { id: 2, title: 6, description: "Cabang" }, { id: 3, title: 3000, description: "Anggota Aktif" }, { id: 4, title: 171, description: "Pengurus Inti" });
  }

  const router = useRouter();

  const handleChangePage = () => {
    router.push("/kontak");
  };

  if (loading && !heroContent) {
    return (
      <section id="home" className="bg-black flex justify-center items-center h-[840px]">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section id="home" className="bg-black">
      <div className="relative h-[840px] w-full text-white">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="h-full w-full"
        >
          {images.length > 0 ? (
            images.map((src, index) => (
              <SwiperSlide key={src || index}> 
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover h-full w-full"
                  style={{ zIndex: "-1" }}
                  priority={index === 0}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide> {/* Fallback jika tidak ada gambar */}
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <p>No images available</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        <div className="absolute inset-0 z-10 flex flex-col items-center lg:items-start justify-center bg-black/50 text-center pt-32">
          <SplitText
            text={mainText}
            className="mb-4 text-4xl font-bold md:text-6xl lg:ml-44"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            threshold={0.2}
            rootMargin="-50px"
          />
          <BlurText
            text={subText}
            delay={150}
            animateBy="words"
            direction="top"
            className="mb-8 text-lg md:text-xl max-w-xl lg:ml-44 px-8 lg:px-0"
          />
          <Button
            onClick={() => router.push(buttonLink)}
            className="bg-accent text-textcolor hover:bg-accent hover:text-white transition duration-300 lg:ml-44"
          >
            {buttonText}
          </Button>
        </div>

        <div
          className="absolute left-1/2 transform -translate-x-1/2 
                     bottom-[-50px] md:bottom-[-50px]  
                     w-11/12 md:w-5/6 lg:w-3/4 xl:w-2/3 
                     py-4 px-2 sm:px-4 
                     bg-secondary/80 bg-opacity-90 backdrop-blur-md rounded-lg shadow-2xl z-20
                     border-t-4 border-accent"
          // Untuk background gambar kotak-kotak, Anda bisa menggunakan style seperti ini:
          // style={{ backgroundImage: "url('/assets/hero1.jpg')", backgroundRepeat: 'repeat', backgroundSize: 'auto' }}
        >
          <div className="flex flex-row justify-around items-start text-white w-full gap-x-2 md:gap-x-4">
            {infoBoxesData.map((box) => (
              <div
                key={box.id || box.description}
                className="flex flex-col items-center text-center flex-1 min-w-0 px-1"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-accent">
                  <CountUp
                    from={0}
                    to={box.title}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                  />
                  +
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-tight">
                  {box.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {error && !loading && !heroContent && (
          <p className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-red-500 z-30">Gagal memuat konten hero: {error}</p>
        )}
      </div>
    </section>
  );
};

export default Hero;
