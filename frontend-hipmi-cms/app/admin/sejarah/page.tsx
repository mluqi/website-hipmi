"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useCustom, SejarahItem } from "@/contexts/CustomContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const EditSejarahPage = () => {
  const {
    sejarahData,
    fetchSejarah,
    updateSejarah,
    loadingSejarah: loading,
    errorSejarah: error,
    clearErrorSejarah,
  } = useCustom();

  const [konten, setKonten] = useState<string>("");
  const [foto, setFoto] = useState<File | null>(null);
  const [previewFoto, setPreviewFoto] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadSejarah = async () => {
      setInitialLoading(true);
      clearErrorSejarah();
      await fetchSejarah();
      setInitialLoading(false);
    };
    loadSejarah();
  }, [fetchSejarah]);

  useEffect(() => {
    if (sejarahData) {
      setKonten(sejarahData.sejarah_konten || "");
      if (sejarahData.sejarah_foto) {
        setPreviewFoto(`${urlBase}/storage/${sejarahData.sejarah_foto}`);
      } else {
        setPreviewFoto(null);
      }
    }
  }, [sejarahData]);

  const handleKontenChange = (value: string) => {
    setKonten(value);
  };

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoto(file);
      setPreviewFoto(URL.createObjectURL(file));
    } else {
      setFoto(null);
      setPreviewFoto(
        sejarahData?.sejarah_foto
          ? `${urlBase}/storage/${sejarahData.sejarah_foto}`
          : null
      );
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    clearErrorSejarah();

    const formData = new FormData();
    formData.append("konten", konten);
    if (foto) {
      formData.append("foto", foto);
    }
    formData.append("_method", "PUT");

    const result = await updateSejarah(formData);
    if (result) {
      setSuccessMessage("Data sejarah berhasil diperbarui!");
      setFoto(null);
      await fetchSejarah();
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Sejarah</h1>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Sukses!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-6">
          <label
            htmlFor="konten"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Konten Sejarah
          </label>
          {typeof window === "object" && ReactQuill && (
            <ReactQuill
              theme="snow"
              value={konten}
              onChange={handleKontenChange}
              className="h-64 mb-12 text-textcolor"
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                height: "300px",
                marginBottom: "100px",
              }}
            />
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="foto"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Foto Sejarah (Kosongkan jika tidak ingin mengubah)
          </label>
          <input
            type="file"
            id="foto"
            onChange={handleFotoChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept="image/*"
          />
          {previewFoto && (
            <div className="mt-4">
              <div className="relative w-[200px] h-[150px]">
                <Image
                  src={previewFoto}
                  alt="Preview Foto Sejarah"
                  fill
                  sizes="(max-width: 768px) 200px, 150px"
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:bg-gray-400"
        >
          {loading ? <LoadingSpinner /> : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
};

export default EditSejarahPage;
