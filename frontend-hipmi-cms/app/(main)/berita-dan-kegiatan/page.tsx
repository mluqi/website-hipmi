"use client";

import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePublic } from "@/contexts/PublicContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const imageStorageBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://dev3-p3.palindo.id/storage/";

const BERITA_ITEMS_PER_PAGE = 6;

const BeritaKegiatan = () => {
  const {
    beritaList,
    kegiatanList,
    loading,
    error,
    fetchBerita,
    fetchKegiatan,
    beritaCurrentPage,
    beritaTotalPages,
  } = usePublic();

  const [searchInput, setSearchInput] = useState("");
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState("");
  const [localCurrentPage, setLocalCurrentPage] = useState(1);

  useEffect(() => {
    fetchKegiatan();
  }, [fetchKegiatan]);

  useEffect(() => {
    fetchBerita(submittedSearchQuery, localCurrentPage, BERITA_ITEMS_PER_PAGE);
  }, [fetchBerita, localCurrentPage, submittedSearchQuery]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalCurrentPage(1);
    setSubmittedSearchQuery(searchInput);
  };

  const handleNextPage = () => {
    if (beritaCurrentPage < beritaTotalPages) {
      setLocalCurrentPage(beritaCurrentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (beritaCurrentPage > 1) {
      setLocalCurrentPage(beritaCurrentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-40 text-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Gagal memuat data
        </h1>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <main className="bg-slate-100 min-h-screen">
      <div className="relative bg-gradient-to-br from-secondary to-accent text-white py-20 md:py-28 text-center pt-32 md:pt-44">
        <div
          className="absolute inset-0 z-0 bg-[url('/assets/patterns/geometric-lines.svg')] bg-repeat opacity-10"
          aria-hidden="true"
        ></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Berita & Kegiatan
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Ikuti semua perkembangan terbaru, artikel mendalam, dan jadwal
            kegiatan dari HIPMI Kota Cirebon.
          </p>
        </div>
      </div>

      <section id="semua-berita" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-textcolor mb-8 md:mb-10 text-center md:text-left">
            Telusuri Berita
          </h2>

          <form
            onSubmit={handleSearchSubmit}
            className="mb-8 max-w-xl mx-auto md:mx-0"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Cari berita..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none text-textcolor"
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Cari
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaList.map((article) => (
              <Link
                href={`/berita-dan-kegiatan/berita/${article.id}`}
                key={article.id}
                legacyBehavior
              >
                <a className="block bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
                  <div className="relative w-full h-56">
                    <Image
                      src={
                        `${imageStorageBaseUrl}${article.berita_foto}` ||
                        "/assets/placeholder.jpg"
                      }
                      alt={article.berita_judul}
                      fill
                      priority
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {article.berita_kategori}
                    </span>
                    <h3 className="text-xl font-semibold text-textcolor mb-2 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                      {article.berita_judul}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {new Date(article.berita_tanggal).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <p
                      className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4"
                      dangerouslySetInnerHTML={{
                        __html: article.berita_isi.substring(0, 150),
                      }}
                    />
                    <span className="text-secondary text-xs hover:text-accent font-medium text-sm">
                      Baca Selengkapnya &rarr;
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          {beritaList.length === 0 && !loading && (
            <p className="text-center text-gray-500 mt-8">
              Tidak ada berita yang cocok dengan pencarian Anda.
            </p>
          )}

          {beritaList.length > 0 && beritaTotalPages > 1 && (
            <div className="mt-12 flex justify-center items-center space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={beritaCurrentPage <= 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <span className="text-gray-700">
                Halaman {beritaCurrentPage} dari {beritaTotalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={beritaCurrentPage >= beritaTotalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Berikutnya
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="semua-kegiatan" className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-textcolor mb-8 md:mb-10 text-center md:text-left">
            Semua Kegiatan
          </h2>
          {kegiatanList.length > 0 ? (
            <div className="overflow-hidden">
              {" "}
              {/* Div pembungkus baru dengan overflow-hidden */}
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1} // Sedikit intipan untuk mobile, atau set ke 1 jika ingin 1 slide penuh
                centeredSlides={false}
                navigation
                pagination={{ clickable: true }}
                className="kegiatan-list-slider" // Kelas ini akan kita targetkan untuk overflow: visible
                loop={kegiatanList.length > 3} // Sesuaikan dengan slidesPerView maksimum
                breakpoints={{
                  // Mobile (default) - slidesPerView: 1.15, spaceBetween: 15 (atau 20)
                  // Anda bisa juga membuat breakpoint khusus untuk layar < 640px jika perlu
                  // 480: {
                  //   slidesPerView: 1.1, // Lebih sedikit intipan di layar sangat kecil
                  //   spaceBetween: 10,
                  // },
                  768: {
                    // md
                    slidesPerView: 2.2,
                    spaceBetween: 25,
                  },
                  1024: {
                    // lg
                    slidesPerView: 3.2, // Sedikit intipan di layar besar juga bisa bagus
                    spaceBetween: 30,
                  },
                }}
              >
                {kegiatanList.map((activity) => {
                  const activityDate = new Date(activity.kegiatan_tanggal);
                  const day = activityDate.getDate();
                  const monthYear = activityDate.toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  });

                  return (
                    <SwiperSlide
                      key={activity.id}
                      style={{ display: "flex", height: "auto" }}
                    >
                      <Link
                        href={`/berita-dan-kegiatan/kegiatan/${activity.id}`}
                        legacyBehavior
                      >
                        <a className="block bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group h-full">
                          <div className="flex items-start gap-x-4 mb-3">
                            <div className="flex-shrink-0 text-center border-r border-gray-200 pr-4 mr-1 py-1">
                              <p className="text-3xl font-bold text-textcolor leading-none">
                                {day}
                              </p>
                              <p className="text-xs text-gray-500 uppercase tracking-wider">
                                {monthYear}
                              </p>
                            </div>
                            <div className="flex-grow">
                              {activity.kegiatan_kategori && (
                                <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-2 py-1 rounded-full mb-1.5">
                                  {activity.kegiatan_kategori}
                                </span>
                              )}
                              <h4 className="text-lg font-bold text-textcolor line-clamp-2 group-hover:text-textcolor/60 transition-colors">
                                {activity.kegiatan_judul}
                              </h4>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3 flex-grow">
                            {activity.kegiatan_isi.substring(0, 120)}...
                          </p>
                          <div className="text-xs text-gray-500 space-y-1 border-t border-gray-100 pt-3 mt-auto">
                            <p>
                              <span className="font-medium text-gray-700">
                                Waktu:
                              </span>{" "}
                              {activity.kegiatan_waktu}
                            </p>
                            {activity.kegiatan_lokasi && (
                              <p>
                                <span className="font-medium text-gray-700">
                                  Lokasi:
                                </span>{" "}
                                {activity.kegiatan_lokasi}
                              </p>
                            )}
                          </div>
                          <span className="text-primary font-medium text-xs group-hover:underline mt-3 self-start">
                            Lihat Detail &rarr;
                          </span>
                        </a>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Belum ada kegiatan untuk ditampilkan.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default BeritaKegiatan;
