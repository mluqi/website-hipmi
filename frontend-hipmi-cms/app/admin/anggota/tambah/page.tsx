"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAnggota, AnggotaPayload } from "@/contexts/AnggotaContext";
import { usePublic } from "@/contexts/PublicContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import "react-quill/dist/quill.snow.css";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const TambahAnggotaPage = () => {
  const { createAnggota, isLoading, error, clearError } = useAnggota();
  const {
    bidangList,
    jabatanList,
    fetchBidang,
    fetchJabatan,
    loading: publicLoading, // Tambahkan loading state dari PublicContext
  } = usePublic(); // Gunakan PublicContext
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [jabatanId, setJabatanId] = useState<string | number>(""); // Simpan ID jabatan
  const [bidangId, setBidangId] = useState<string | number>(""); // Simpan ID bidang
  const [perusahaan, setPerusahaan] = useState("");
  const [perusahaanAlamat, setPerusahaanAlamat] = useState("");
  const [perusahaanLogo, setPerusahaanLogo] = useState<File | null>(null);
  const [perusahaanWebsite, setPerusahaanWebsite] = useState("");
  const [pengalaman, setPengalaman] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [tiktok, setTiktok] = useState("");

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchBidang();
    fetchJabatan();
    return () => {
      clearError();
    };
  }, [clearError, fetchBidang, fetchJabatan]);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    const payload: AnggotaPayload = {
      nama,
      email,
      telepon,
      jabatan: jabatanId.toString(),
      bidang: bidangId.toString(),
      perusahaan,
      perusahaan_alamat: perusahaanAlamat,
      perusahaan_logo: perusahaanLogo,
      perusahaan_website: perusahaanWebsite || null,
      pengalaman,
      foto,
      instagram: instagram || null,
      facebook: facebook || null,
      linkedin: linkedin || null,
      tiktok: tiktok || null,
    };

    const result = await createAnggota(payload);

    if (result) {
      setSuccessMessage("Anggota berhasil ditambahkan!");
      // Reset form
      setNama("");
      setEmail("");
      setTelepon("");
      setJabatanId("");
      setBidangId("");
      setPerusahaan("");
      setPerusahaanAlamat("");
      setPerusahaanLogo(null);
      setPerusahaanWebsite("");
      setPengalaman("");
      setFoto(null);
      setInstagram("");
      setFacebook("");
      setLinkedin("");
      setTiktok("");

      const fotoInput = document.getElementById("foto") as HTMLInputElement;
      if (fotoInput) fotoInput.value = "";
      const logoInput = document.getElementById(
        "perusahaan_logo"
      ) as HTMLInputElement;
      if (logoInput) logoInput.value = "";

      setTimeout(() => {
        router.push("/admin/anggota");
      }, 500);
    }
  };

  const handlePengalamanChange = (content: string) => {
    setPengalaman(content);
  };

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
      ["clean"],
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

  if (publicLoading && !bidangList.length && !jabatanList.length) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Tambah Anggota Baru
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 space-y-6"
      >
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="telepon"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="telepon"
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
              required
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="jabatan"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Jabatan di HIPMI
            </label>
            <select
              id="jabatan"
              value={jabatanId}
              onChange={(e) => setJabatanId(e.target.value)}
              required
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Pilih Jabatan
              </option>
              {jabatanList.map((jabatanItem) => (
                <option key={jabatanItem.id} value={jabatanItem.id}>
                  {jabatanItem.jabatan_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="bidang"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bidang Usaha (Kategori Anggota)
            </label>
            <select
              id="bidang"
              value={bidangId}
              onChange={(e) => setBidangId(e.target.value)}
              required
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>
                Pilih Bidang Usaha
              </option>
              {bidangList.map((bidangItem) => (
                <option key={bidangItem.id} value={bidangItem.id}>
                  {bidangItem.bidang_nama}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="foto"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Foto Anggota (Opsional)
            </label>
            <input
              type="file"
              id="foto"
              onChange={(e) => handleFileChange(e, setFoto)}
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
        </div>

        <div>
          <label
            htmlFor="pengalaman"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Isi Pengalaman
          </label>
          {typeof window === "object" && ReactQuill && (
            <ReactQuill
              theme="snow"
              value={pengalaman}
              onChange={handlePengalamanChange}
              modules={quillModules}
              formats={quillFormats}
              className="bg-white text-textcolor"
              style={{ height: "300px", marginBottom: "150px" }}
            />
          )}
        </div>

        {/* Company Info */}
        <div className="border-t pt-6 mt-6 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Informasi Perusahaan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="perusahaan"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama Perusahaan
              </label>
              <input
                type="text"
                id="perusahaan"
                value={perusahaan}
                onChange={(e) => setPerusahaan(e.target.value)}
                required
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="perusahaan_website"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Website Perusahaan (Opsional)
              </label>
              <input
                type="url"
                id="perusahaan_website"
                value={perusahaanWebsite}
                onChange={(e) => setPerusahaanWebsite(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="perusahaan_alamat"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Alamat Perusahaan
              </label>
              <textarea
                id="perusahaan_alamat"
                value={perusahaanAlamat}
                onChange={(e) => setPerusahaanAlamat(e.target.value)}
                required
                rows={3}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="perusahaan_logo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Logo Perusahaan (Opsional)
              </label>
              <input
                type="file"
                id="perusahaan_logo"
                onChange={(e) => handleFileChange(e, setPerusahaanLogo)}
                accept="image/jpeg,image/png,image/jpg,image/gif"
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {perusahaanLogo && (
                <p className="text-xs mt-1 text-gray-600">
                  File dipilih: {perusahaanLogo.name}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Format: JPG, PNG, GIF. Maks: 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t pt-6 mt-6 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Media Sosial (Opsional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="instagram"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Instagram URL
              </label>
              <input
                type="url"
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="facebook"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Facebook URL
              </label>
              <input
                type="url"
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                LinkedIn URL
              </label>
              <input
                type="url"
                id="linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="tiktok"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                TikTok URL
              </label>
              <input
                type="url"
                id="tiktok"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center">
            <LoadingSpinner />{" "}
            <span className="ml-2">Menyimpan anggota...</span>
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
            {isLoading ? "Menyimpan..." : "Simpan Anggota"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahAnggotaPage;
