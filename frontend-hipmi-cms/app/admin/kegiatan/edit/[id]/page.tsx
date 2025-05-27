"use client";

import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
} from "react";
import {
  useKegiatan,
  KegiatanPayload,
  KegiatanItem,
} from "@/contexts/KegiatannContext";
import { useRouter, useParams } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const EditKegiatanPage = () => {
  const { getKegiatanById, updateKegiatan, isLoading, error, clearError } =
    useKegiatan();
  const router = useRouter();
  const params = useParams();
  const id = params.id ? parseInt(params.id as string, 10) : null;

  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [currentFotoUrl, setCurrentFotoUrl] = useState<string | null>(null);
  const [newFoto, setNewFoto] = useState<File | null>(null);
  const [kategori, setKategori] = useState("");
  const [tanggal, setTanggal] = useState<string>("");
  const [waktu, setWaktu] = useState<string>("");
  const [lokasi, setLokasi] = useState<string>("");

  const [initialLoading, setInitialLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchKegiatanData = useCallback(async () => {
    if (!id) {
      setInitialLoading(false);
      return;
    }
    clearError();
    setFetchError(null);
    setInitialLoading(true);
    const kegiatan = await getKegiatanById(id);
    if (kegiatan) {
      setJudul(kegiatan.kegiatan_judul);
      setIsi(kegiatan.kegiatan_isi);
      setKategori(kegiatan.kegiatan_kategori);
      setLokasi(kegiatan.kegiatan_lokasi);
      setTanggal(kegiatan.kegiatan_tanggal.split("T")[0]);
      setWaktu(kegiatan.kegiatan_waktu.substring(0, 5));
      setCurrentFotoUrl(
        kegiatan.kegiatan_foto
          ? `${urlBase}/storage/${kegiatan.kegiatan_foto}`
          : null
      );
    } else {
      setFetchError(error || `Kegiatan dengan ID ${id} tidak ditemukan.`);
    }
    setInitialLoading(false);
  }, [id, getKegiatanById, clearError, error]);

  useEffect(() => {
    fetchKegiatanData();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFoto(e.target.files[0]);
      setCurrentFotoUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setNewFoto(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    clearError();
    setSuccessMessage(null);

    const payload: KegiatanPayload = {
      judul,
      isi,
      kategori,
      tanggal,
      waktu,
      lokasi,
    };

    if (newFoto) {
      payload.foto = newFoto;
    }

    const result = await updateKegiatan(id, payload);

    if (result) {
      setSuccessMessage("Kegiatan berhasil diperbarui!");
      if (result.kegiatan_foto) {
        // Update currentFotoUrl if backend returns new path
        setCurrentFotoUrl(`${urlBase}/storage/${result.kegiatan_foto}`);
      }
      setNewFoto(null); // Reset new photo state
      setTimeout(() => {
        router.push("/admin/kegiatan");
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
          onClick={() => id && fetchKegiatanData()}
          className="ml-2 text-blue-500"
        >
          Coba lagi
        </button>
      </div>
    );
  if (!id)
    return (
      <div className="container mx-auto p-4 py-8 text-center text-red-500">
        ID Kegiatan tidak valid.
      </div>
    );

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Kegiatan</h1>
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
          {currentFotoUrl && (
            <div className="mb-2">
              <div className="relative w-[150px] h-[150px]">
                <Image
                  src={currentFotoUrl}
                  alt="Foto Kegiatan Saat Ini"
                  fill
                  sizes="(max-width: 768px) 150px, 150px"
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          )}
          <input
            type="file"
            id="foto"
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/jpg,image/gif"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {newFoto && (
            <p className="text-xs mt-1 text-gray-600">
              File baru dipilih: {newFoto.name}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Kosongkan jika tidak ingin mengubah foto. Format: JPG, PNG, GIF.
            Maks: 2MB.
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <LoadingSpinner />{" "}
            <span className="ml-2">Memperbarui kegiatan...</span>
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

export default EditKegiatanPage;
