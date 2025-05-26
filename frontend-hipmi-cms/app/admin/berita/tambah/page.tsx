"use client";

import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from "react";
import { useBerita, BeritaPayload } from "@/contexts/BeritaContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import api from "@/services/api";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false }); // Quill instance tidak perlu ref lagi untuk imageHandler default

const TambahBeritaPage = () => {
  const { createBerita, isLoading, error, clearError } = useBerita();
  const router = useRouter();

  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState(""); // State untuk menyimpan konten HTML dari editor
  const [kategori, setKategori] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { uploadEditorImage } = useBerita(); // Ambil fungsi upload dari context
  // const quillRef = React.useRef<any>(null); // Tidak lagi diperlukan untuk imageHandler default

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleIsiChange = (content: string) => {
    setIsi(content);
  };

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

    let processedIsi = isi; // Konten isi yang akan diproses

    // 1. Deteksi dan unggah gambar base64 dari konten 'isi'
    const imagesToUpload: Array<{ placeholder: string; file: File }> = [];
    const imgRegex = /<img src="data:image\/[^;]+;base64,([^"]+)"/g;
    let match;
    while ((match = imgRegex.exec(isi)) !== null) {
      const base64Data = match[1];
      const fullBase64Src = match[0].substring(10, match[0].length -1); // Ambil src="data:..."
      try {
        const blob = await fetch(fullBase64Src).then(res => res.blob());
        // Tentukan nama file (bisa digenerate atau default)
        const extension = blob.type.split('/')[1] || 'png';
        const fileName = `editor_image_${Date.now()}.${extension}`;
        const imageFile = new File([blob], fileName, { type: blob.type });
        imagesToUpload.push({ placeholder: fullBase64Src, file: imageFile });
      } catch (e) {
        console.error("Error converting base64 to file:", e);
      }
    }

    if (imagesToUpload.length > 0) {
      // setIsLoading(true); // Set loading state (mungkin perlu state loading terpisah untuk ini)
      try {
        for (const imageData of imagesToUpload) {
          const result = await uploadEditorImage(imageData.file);
          if (result && result.success && result.url) {
            // Ganti placeholder base64 dengan URL dari server
            // Hati-hati dengan special characters dalam placeholder jika menggunakan string.replace
            // Menggunakan regex untuk replace lebih aman jika placeholder kompleks
            processedIsi = processedIsi.replace(imageData.placeholder, result.url);
          } else {
            throw new Error(result?.message || `Gagal mengunggah salah satu gambar editor.`);
          }
        }
      } catch (uploadAllError: any) {
        // setError(uploadAllError.message || "Terjadi kesalahan saat mengunggah gambar dari editor.");
        // setIsLoading(false);
        return; // Hentikan proses jika ada gambar yang gagal diunggah
      }
    }

    const payload: BeritaPayload = {
      judul,
      isi: processedIsi, // Gunakan konten yang sudah diproses
      foto,
      kategori,
      tanggal,
    };

    const result = await createBerita(payload);

    if (result) {
      setSuccessMessage("Berita berhasil ditambahkan!");
      // Reset form
      setJudul("");
      setIsi("");
      setFoto(null);
      // Kosongkan file input secara programatik jika perlu
      const fileInput = document.getElementById("foto") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
      setKategori("");
      setTanggal(new Date().toISOString().split("T")[0]);

      setTimeout(() => {
        router.push("/admin/berita");
      }, 500);
    }
  };

  const quillModules = {
    toolbar: {
      container: [
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
        ["clean"],
      ], // Hapus handlers: { image: imageHandler } agar Quill menggunakan perilaku default
    },
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Tambah Berita Baru
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
              // ref={quillRef} // Tidak lagi diperlukan jika tidak ada handler kustom
              theme="snow"
              value={isi}
              onChange={handleIsiChange}
              modules={quillModules}
              formats={quillFormats}
              className="bg-white text-textcolor"
              style={{ height: "300px", marginBottom: "100px" }}
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
            Foto Berita
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

        {isLoading && <p className="text-blue-600">Menyimpan berita...</p>}
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
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline disabled:bg-gray-400 transition duration-150 ease-in-out"
          >
            {isLoading ? "Menyimpan..." : "Simpan Berita"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahBeritaPage;
