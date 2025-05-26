"use client";

import React, { useState, FormEvent, useEffect, useCallback } from "react";
import { useBidang, BidangPayload } from "@/contexts/BidangContext";
import { useRouter, useParams } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const EditBidangPage = () => {
  const { getBidangById, updateBidang, isLoading, error, clearError } =
    useBidang();
  const router = useRouter();
  const params = useParams();
  const id = params.id ? parseInt(params.id as string, 10) : null;

  const [namaBidang, setNamaBidang] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchBidangData = useCallback(async () => {
    if (!id) {
      setFetchError("ID Bidang tidak valid.");
      setInitialLoading(false);
      return;
    }
    clearError();
    setFetchError(null);
    setInitialLoading(true);
    const bidang = await getBidangById(id);
    if (bidang) {
      setNamaBidang(bidang.bidang_nama);
    } else {
      setFetchError(error || `Bidang dengan ID ${id} tidak ditemukan.`);
    }
    setInitialLoading(false);
  }, [id, getBidangById, clearError, error]);

  useEffect(() => {
    fetchBidangData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    clearError();
    setSuccessMessage(null);

    const payload: BidangPayload = { bidang_nama: namaBidang };
    const result = await updateBidang(id, payload);

    if (result) {
      setSuccessMessage("Bidang berhasil diperbarui!");
      setTimeout(() => {
        router.push("/admin/bidang");
      });
    }
  };

  if (initialLoading)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );
  if (fetchError)
    return (
      <div className="container mx-auto p-4 py-8 text-center text-red-500">
        Error: {fetchError}{" "}
        <button
          onClick={() => id && fetchBidangData()}
          className="ml-2 text-blue-500"
        >
          Coba lagi
        </button>
      </div>
    );
  if (!id)
    return (
      <div className="container mx-auto p-4 py-8 text-center text-red-500">
        ID Bidang tidak valid.
      </div>
    );

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Bidang</h1>
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
            <LoadingSpinner />{" "}
            <span className="ml-2">Memperbarui bidang...</span>
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
            {isLoading ? "Memperbarui..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBidangPage;
