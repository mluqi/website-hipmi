"use client";

import React, { useEffect } from "react";
import { usePublic } from "@/contexts/PublicContext";
import LoadingSpinner from "./ui/LoadingSpinner";

const VisiMisi: React.FC = () => {
  const { landingPageData, fetchLandingPageComponents, loading, error } =
    usePublic();

  useEffect(() => {
    if (!landingPageData.visimisi) {
      fetchLandingPageComponents();
    }
  }, [landingPageData.visimisi, fetchLandingPageComponents]);

  const visiMisiContent = landingPageData.visimisi;
  const visiText = visiMisiContent?.visi?.value || "Visi default perusahaan...";
  const misiText =
    visiMisiContent?.misi?.value || "Misi default 1.\nMisi default 2.";
  const misiItems = misiText.split("\n").filter((item) => item.trim() !== "");

  if (loading && !visiMisiContent) {
    return (
      <section
        id="visi-misi"
        className="relative py-16 md:py-24 flex justify-center items-center min-h-[300px]
                 bg-gradient-to-br from-secondary to-slate-800"
      >
        <LoadingSpinner />
      </section>
    );
  }

  if (error && !visiMisiContent) {
    return (
      <section
        id="visi-misi"
        className="relative py-16 md:py-24 text-center text-red-500
                 bg-gradient-to-br from-secondary to-slate-800 text-white"
      >
        <p>Gagal memuat konten Visi Misi: {error}</p>
      </section>
    );
  }

  return (
    <section
      id="visi-misi"
      className="relative py-16 md:py-24 
                 bg-gradient-to-br from-secondary to-slate-800"
    >
      <div
        className="absolute inset-0 z-0 
                   bg-[url('/assets/patterns/geometric-lines.svg')] bg-repeat 
                   opacity-15"
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {" "}
        {/* Konten harus di atas overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Visi Card */}
          <div
            className="bg-accent/50 backdrop-blur-lg p-6 md:p-8 rounded-xl shadow-lg border border-white/10
                          transition-all duration-300 ease-in-out hover:bg-accent/60 hover:shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Visi
            </h3>
            {/* Using dangerouslySetInnerHTML as content might come from Quill */}
            {/* Ensure content is sanitized in backend */}
            <div
              className="text-gray-200 leading-relaxed prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: visiText }}
            />
          </div>

          {/* Misi Card */}
          <div
            className="bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-xl shadow-lg border border-white/10
                          transition-all duration-300 ease-in-out hover:bg-white/20 hover:shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Misi
            </h3>
            <ul className="list-disc list-inside text-gray-200 space-y-2.5 leading-relaxed prose prose-invert max-w-none">
              {misiItems.map((item, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;
