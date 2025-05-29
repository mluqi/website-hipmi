"use client";

import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
} from "react";
import { useBerita, BeritaPayload, BeritaItem } from "@/contexts/BeritaContext";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const urlBase = "https://dev3-p3.palindo.id";

const EditBeritaPage = () => {
  const {
    getBeritaById,
    updateBerita,
    isLoading,
    error,
    clearError,
    uploadEditorImage,
  } = useBerita(); // Ambil uploadEditorImage
  const router = useRouter();
  const params = useParams();

  const beritaId = Number(params.id);

  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [currentFotoUrl, setCurrentFotoUrl] = useState<string | null>(null);
  const [kategori, setKategori] = useState("");
  const [tanggal, setTanggal] = useState<string>("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchBeritaDetail = useCallback(async () => {
    if (!beritaId) {
      //   setError("ID Berita tidak valid.");
      setInitialLoading(false);
      return;
    }
    clearError();
    setInitialLoading(true);
    const beritaData = await getBeritaById(beritaId);
    if (beritaData) {
      setJudul(beritaData.berita_judul);
      setIsi(beritaData.berita_isi);
      setKategori(beritaData.berita_kategori);
      if (beritaData.berita_tanggal) {
        setTanggal(beritaData.berita_tanggal.split(" ")[0]);
      }
      setCurrentFotoUrl(
        beritaData.berita_foto
          ? `${urlBase}/storage/${beritaData.berita_foto}`
          : null
      );
    } else {
    }
    setInitialLoading(false);
  }, [beritaId, getBeritaById, clearError]);

  useEffect(() => {
    fetchBeritaDetail();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
      setCurrentFotoUrl(URL.createObjectURL(e.target.files[0])); // Preview foto baru
    } else {
      setFoto(null);
    }
  };

  const handleIsiChange = (content: string) => {
    setIsi(content);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    if (!beritaId) {
      return;
    }

    let processedIsi = isi; // Konten isi yang akan diproses

    // 1. Deteksi dan unggah gambar base64 dari konten 'isi'
    const imagesToUpload: Array<{ placeholder: string; file: File }> = [];
    const imgRegex = /<img src="data:image\/[^;]+;base64,([^"]+)"/g;
    let match;
    while ((match = imgRegex.exec(isi)) !== null) {
      const base64Data = match[1];
      const fullBase64Src = match[0].substring(10, match[0].length - 1); // Ambil src="data:..."
      try {
        const blob = await fetch(fullBase64Src).then((res) => res.blob());
        const extension = blob.type.split("/")[1] || "png";
        const fileName = `editor_image_${Date.now()}.${extension}`;
        const imageFile = new File([blob], fileName, { type: blob.type });
        imagesToUpload.push({ placeholder: fullBase64Src, file: imageFile });
      } catch (e) {
        console.error("Error converting base64 to file:", e);
      }
    }

    if (imagesToUpload.length > 0) {
      // Anda bisa menambahkan state loading spesifik untuk proses ini jika diinginkan
      // setIsLoading(true); // Atau state lain seperti isProcessingImages
      try {
        for (const imageData of imagesToUpload) {
          const result = await uploadEditorImage(imageData.file);
          if (result && result.success && result.url) {
            processedIsi = processedIsi.replace(
              imageData.placeholder,
              result.url
            );
          } else {
            throw new Error(
              result?.message || `Gagal mengunggah salah satu gambar editor.`
            );
          }
        }
      } catch (uploadAllError: any) {
        // setError(uploadAllError.message || "Terjadi kesalahan saat mengunggah gambar dari editor.");
        // setIsLoading(false); // Reset state loading spesifik
        alert(`Error unggah gambar dari editor: ${uploadAllError.message}`); // Tampilkan error ke pengguna
        return; // Hentikan proses jika ada gambar yang gagal diunggah
      }
    }

    const payload: BeritaPayload = {
      judul,
      isi: processedIsi, // Gunakan konten yang sudah diproses
      kategori,
      tanggal,
    };
    if (foto) {
      payload.foto = foto;
    }

    const result = await updateBerita(beritaId, payload);

    if (result) {
      setSuccessMessage("Berita berhasil diperbarui!");
      // Reset state foto jika ada, agar tidak terkirim lagi jika form tidak di-refresh
      setFoto(null);
      // Update preview foto utama jika berubah
      if (result.berita_foto) {
        setCurrentFotoUrl(`${urlBase}/storage/${result.berita_foto}`);
      }
      setTimeout(() => {
        router.push("/admin/berita");
      }, 1000);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );
  }

  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"], // Hapus handler kustom agar Quill menggunakan perilaku default untuk preview base64
    ],
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Berita</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 space-y-6"
      >
        <div>
          <label
            htmlFor="judul"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Judul Berita
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
            Isi Berita
          </label>
          {typeof window === "object" && ReactQuill && (
            <ReactQuill
              theme="snow"
              value={isi}
              onChange={handleIsiChange}
              modules={quillModules}
              formats={quillFormats}
              className="bg-white text-textcolor"
              style={{ height: "300px", marginBottom: "150px" }}
            />
          )}
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
            htmlFor="tanggal"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tanggal Publikasi
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
            htmlFor="foto"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Ganti Foto Berita (Opsional)
          </label>
          {currentFotoUrl && (
            <div className="relative w-[150px] h-[150px]">
              <Image
                src={currentFotoUrl}
                alt="Foto saat ini"
                fill
                sizes="(max-width: 768px) 150px, 150px"
                className="rounded-md object-cover mb-2"
              />
            </div>
          )}
          <input
            type="file"
            id="foto"
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/jpg,image/gif"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {foto && (
            <p className="text-xs mt-1 text-gray-600">
              File baru dipilih: {foto.name}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Format: JPG, PNG, GIF. Maks: 2MB. Kosongkan jika tidak ingin
            mengganti foto.
          </p>
        </div>

        {isLoading && <p className="text-blue-600">Memperbarui berita...</p>}
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
            type="submit"
            disabled={isLoading || initialLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline disabled:bg-gray-400 transition duration-150 ease-in-out"
          >
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBeritaPage;
