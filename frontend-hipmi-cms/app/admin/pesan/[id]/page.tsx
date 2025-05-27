"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { usePesan, PesanItem } from "@/contexts/PesanContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaQuestionCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const PesanDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const pesanId = params.id ? parseInt(params.id as string) : null;

  const { getPesanDetail, isLoading, error, clearError } = usePesan();
  const [pesan, setPesan] = useState<PesanItem | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);

  useEffect(() => {
    if (pesanId) {
      clearError();
      setPageError(null);
      getPesanDetail(pesanId)
        .then((data) => {
          if (data) {
            setPesan(data);
          } else {
            setPageError("Pesan tidak ditemukan atau gagal dimuat.");
          }
        })
        .catch(() => {
          setPageError("Terjadi kesalahan saat memuat detail pesan.");
        });
    } else {
      setPageError("ID Pesan tidak valid.");
    }
  }, [pesanId, getPesanDetail, clearError]);

  if (isLoading && !pesan) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );
  }

  if (pageError || (error && !pesan)) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <p className="text-red-500 mb-4">{pageError || error}</p>
        <Link href="/admin/pesan" legacyBehavior>
          <a className="text-secondary hover:text-secondary/80">
            &larr; Kembali ke Kotak Masuk
          </a>
        </Link>
      </div>
    );
  }

  if (!pesan) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <p className="text-textcolor">Pesan tidak ditemukan.</p>
        <Link href="/admin/pesan" legacyBehavior>
          <a className="text-secondary hover:text-secondary/80 mt-4 inline-block">
            &larr; Kembali ke Kotak Masuk
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-textcolor">Detail Pesan</h1>
        <Link href="/admin/pesan" legacyBehavior>
          <a className="inline-flex items-center text-secondary hover:text-secondary/80">
            <FaArrowLeft className="mr-2" /> Kembali ke Kotak Masuk
          </a>
        </Link>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-textcolor mb-1">
            {pesan.pesan_subjek}
          </h2>
          <p className="text-sm text-gray-500">
            Status:{" "}
            {pesan.pesan_status === "read" ? (
              <span className="text-green-600 font-medium">Sudah Dibaca</span>
            ) : pesan.pesan_status === "pending" ? (
              <span className="text-blue-600 font-medium">Belum Dibaca</span>
            ) : pesan.pesan_status === "replied" ? (
              <span className="text-purple-600 font-medium">Sudah Dibalas</span>
            ) : (
              <span className="text-gray-500 font-medium">
                {pesan.pesan_status}
              </span> // Fallback untuk status tidak dikenal
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm">
          <div className="flex items-center">
            <FaUser className="text-gray-500 mr-3 text-lg" />
            <div>
              <span className="font-medium text-gray-700">Dari:</span>
              <p className="text-textcolor">{pesan.pesan_nama}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 mr-3 text-lg" />
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <p className="text-textcolor hover:text-secondary">
                <a href={`mailto:${pesan.pesan_email}`}>{pesan.pesan_email}</a>
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-500 mr-3 text-lg" />
            <div>
              <span className="font-medium text-gray-700">Diterima:</span>
              <p className="text-textcolor">
                {new Date(pesan.created_at).toLocaleString("id-ID", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Isi Pesan:
          </h3>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 whitespace-pre-wrap text-textcolor">
            {pesan.pesan_isi}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PesanDetailPage;
