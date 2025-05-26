"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useKegiatan, KegiatanPayload } from "@/contexts/KegiatanContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const TambahKegiatanPage = () => {
  const { createKegiatan, isLoading, error, clearError } = useKegiatan();
  const router = useRouter();

  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [kategori, setKategori] = useState("");
  const [tanggal, setTanggal] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [waktu, setWaktu] = useState<string>("09:00");
  const [lokasi, setLokasi] = useState<string>("");

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    } else {
      setFoto(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    const payload: KegiatanPayload = {
      judul,
      isi,
      foto,
      kategori,
      tanggal,
      waktu,
      lokasi,
    };
    console.log(payload);
    const result = await createKegiatan(payload);

    if (result) {
      setSuccessMessage("Kegiatan berhasil ditambahkan!");
      setJudul("");
      setIsi("");
      setFoto(null);
      const fileInput = document.getElementById("foto") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
      setKategori("");
      setTanggal(new Date().toISOString().split("T")[0]);
      setWaktu("09:00");
      setLokasi("");

      setTimeout(() => {
        router.push("/admin/kegiatan");
      }, 500);
    }
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Tambah Kegiatan Baru
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 space-y-6"
      >
        <div>
          <label
            htmlFor="judul"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Judul Kegiatan
          </label>
          <input
            type="text"
            id="judul"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="isi"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Isi Kegiatan
          </label>
          <textarea
            id="isi"
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            required
            rows={8}
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="kategori"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kategori
          </label>
          <input
            type="text"
            id="kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="lokasi"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Lokasi Kegiatan
          </label>
          <input
            type="text"
            id="lokasi"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            required
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="tanggal"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tanggal Kegiatan
          </label>
          <input
            type="date"
            id="tanggal"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="waktu"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Waktu Kegiatan
          </label>
          <input
            type="time"
            id="waktu"
            value={waktu}
            onChange={(e) => setWaktu(e.target.value)}
            required
            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="foto"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Foto Kegiatan
          </label>
          <input
            type="file"
            id="foto"
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/jpg,image/gif"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {foto && (
            <p className="text-xs mt-1 text-gray-600">
              File dipilih: {foto.name}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Format: JPG, PNG, GIF. Maks: 2MB.
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <LoadingSpinner />{" "}
            <span className="ml-2">Menyimpan kegiatan...</span>
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
            {isLoading ? "Menyimpan..." : "Simpan Kegiatan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahKegiatanPage;
