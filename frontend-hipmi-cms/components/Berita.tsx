"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePublic } from "@/contexts/PublicContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000/storage/";

const Berita: React.FC = () => {
  const router = useRouter();
  const {
    beritaList,
    kegiatanList,
    loading,
    error,
    fetchBerita,
    fetchKegiatan,
  } = usePublic();

  useEffect(() => {
    fetchBerita();
    fetchKegiatan();
  }, [fetchBerita, fetchKegiatan]);

  const handleChangePage = () => {
    router.push("/berita-dan-kegiatan");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen py-40">
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

  const displayedNews = beritaList.slice(0, 4);
  const displayedActivities = kegiatanList.slice(0, 5);

  return (
    <section
      id="berita"
      className="relative bg-gradient-to-br from-secondary to-slate-800 text-white py-16 md:py-24"
    >
      <div
        className="absolute inset-0 z-0
                   bg-[url('/assets/patterns/subtle-dots.svg')] bg-repeat
                   opacity-[0.4]"
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Informasi Terkini</h2>
          <p className="text-white/60 mt-2 md:text-lg">
            Berita terbaru dan jadwal kegiatan dari HIPMI Kota Cirebon.
          </p>
        </div>

        <div className="container m-auto grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-16">
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-semibold mb-8">Berita Terbaru</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayedNews.map((article) => (
                <Link
                  href={`/berita-dan-kegiatan/berita/${article.id}`}
                  key={article.id}
                  legacyBehavior
                >
                  <a className="block bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
                    <div className="relative w-full h-48 md:h-56">
                      <Image
                        src={
                          `${baseUrl}${article.berita_foto}` ||
                          "/assets/placeholder.jpg"
                        }
                        alt={article.berita_judul}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 md:p-6">
                      <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        {article.berita_kategori}
                      </span>
                      <h3 className="text-lg md:text-xl font-semibold text-textcolor mb-2 group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                        {article.berita_judul}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 mb-3">
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
                        className="text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-4"
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
          </div>

          {/* Kegiatan Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-8">Kegiatan Mendatang</h3>
            <div className="space-y-6">
              {displayedActivities.map((activity) => {
                const activityDate = new Date(activity.kegiatan_tanggal);
                const day = activityDate.getDate();
                const monthYear = activityDate.toLocaleDateString("id-ID", {
                  month: "long",
                  year: "numeric",
                });

                return (
                  <div
                    key={activity.id}
                    className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start gap-x-4"
                  >
                    <div className="flex-shrink-0 text-center border-r border-gray-200 pr-4 mr-1">
                      <p className="text-3xl font-bold text-textcolor leading-none">
                        {day}
                      </p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        {monthYear}
                      </p>
                    </div>

                    <div className="flex-grow">
                      {activity.kegiatan_kategori && (
                        <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-2 py-1 rounded-full mb-2">
                          {activity.kegiatan_kategori}
                        </span>
                      )}
                      <a href={`/berita-dan-kegiatan/kegiatan/${activity.id}`} className="text-lg font-bold text-textcolor mb-1 line-clamp-2">
                        {activity.kegiatan_judul}
                      </a>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-2">
                        {activity.kegiatan_isi.substring(0, 100)}...
                      </p>
                      <div className="text-xs text-gray-500 space-y-0.5">
                        <p>
                          <span className="font-medium text-gray-700">
                            Waktu:
                          </span>{" "}
                          {activity.kegiatan_waktu}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Button
            onClick={handleChangePage}
            className="bg-accent text-secondary hover:bg-accent hover:text-white transition duration-300 text-center"
          >
            Lihat Selengkapnya
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Berita;
