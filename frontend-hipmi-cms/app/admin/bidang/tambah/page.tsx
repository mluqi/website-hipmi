"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useBidang, BidangPayload } from "@/contexts/BidangContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const TambahBidangPage = () => {
  const { createBidang, isLoading, error, clearError } = useBidang();
  const router = useRouter();

  const [namaBidang, setNamaBidang] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    const payload: BidangPayload = { bidang_nama: namaBidang };
    const result = await createBidang(payload);

    if (result) {
      setSuccessMessage("Bidang berhasil ditambahkan!");
      setNamaBidang("");
      setTimeout(() => {
        router.push("/admin/bidang");
      });
    }
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Tambah Bidang Baru
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 space-y-6 max-w-lg mx-auto"
      >
        <div>
          <label
            htmlFor="bidang_nama"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama Bidang
          </label>
          <input
            type="text"
            id="bidang_nama"
            value={namaBidang}
            onChange={(e) => setNamaBidang(e.target.value)}
            required
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <LoadingSpinner /> <span className="ml-2">Menyimpan bidang...</span>
          </div>
        )}
        {error && (
          <p className="text-red-600 bg-red-100 p-3 rounded-md">
            Error: {error}
          </p>
        )}
        {successMessage && (
          <p className="text-green-600 bg-green-100 p-3 rounded-md">
            {successMessage}
          </p>
        )}

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="mr-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline disabled:bg-gray-400 transition duration-150 ease-in-out"
          >
            {isLoading ? "Menyimpan..." : "Simpan Bidang"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahBidangPage;
