"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { usePublic } from "@/contexts/PublicContext";
import type { BeritaItem } from "@/contexts/PublicContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { FaCalendarAlt, FaTags } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const imageStorageBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000/storage/";

const BeritaDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { fetchBeritaById, loading, error: contextError } = usePublic();
  const [article, setArticle] = useState<BeritaItem | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  useEffect(() => {
    const articleIdString = id as string;
    if (articleIdString) {
      const articleId = parseInt(articleIdString);
      if (!isNaN(articleId)) {
        setPageLoading(true);
        setPageError(null);
        fetchBeritaById(articleId)
          .then(setArticle)
          .catch((err) => {
            console.error("Failed to fetch article:", err);
            setPageError("Gagal memuat detail berita.");
          })
          .finally(() => setPageLoading(false));
      } else {
        setPageError("ID Berita tidak valid.");
        setPageLoading(false);
      }
    }
  }, [id, fetchBeritaById]);

  if (pageLoading || (loading && !article && !pageError)) {
    return (
      <div className="flex items-center justify-center min-h-screen py-40">
        <LoadingSpinner />
      </div>
    );
  }

  if (pageError || (contextError && !article)) {
    return (
      <div className="container mx-auto px-4 py-40 text-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Berita tidak ditemukan
        </h1>
        <p className="text-gray-600 mt-2">{pageError || contextError}</p>
      </div>
    );
  }

  return (
    <main className="bg-slate-50 pt-28 md:pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center text-sm font-medium text-textcolor hover:text-textcolor/80"
        >
          <IoArrowBack className="mr-2 text-lg" /> Kembali
        </button>
        <article className="bg-white p-6 md:p-10 rounded-xl shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-textcolor mb-4 leading-tight">
            {article.berita_judul}
          </h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 space-x-4">
            <span className="flex items-center">
              <FaCalendarAlt className="mr-1.5 text-primary" />{" "}
              {new Date(article.berita_tanggal).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center">
              <FaTags className="mr-1.5 text-primary" />{" "}
              {article.berita_kategori}
            </span>
          </div>

          {article.berita_foto && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-md">
              <Image
                src={`${imageStorageBaseUrl}${article.berita_foto}`}
                alt={article.berita_judul}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div
            className="prose prose-slate lg:prose-xl max-w-none text-textcolor mt-6"
            dangerouslySetInnerHTML={{ __html: article.berita_isi }}
          />
        </article>
      </div>
    </main>
  );
};

export default BeritaDetailPage;
