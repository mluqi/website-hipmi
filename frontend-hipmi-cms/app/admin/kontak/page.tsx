"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePublic, KontakUpdatePayload } from "@/contexts/PublicContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Label = ({ htmlFor, children, className }: { htmlFor: string, children: React.ReactNode, className?: string }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
    {children}
  </label>
);

const KontakEditPage = () => {
  const { kontakData, fetchKontak, updateKontak, loading, error } = usePublic();
  const [formData, setFormData] = useState({
    kontak_alamat: "",
    kontak_telepon: "",
    kontak_email: "",
    kontak_maps: "",
  });
  const [kontakId, setKontakId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchKontak();
  }, [fetchKontak]);

  useEffect(() => {
    if (kontakData) {
      setFormData({
        kontak_alamat: kontakData.kontak_alamat || "",
        kontak_telepon: kontakData.kontak_telepon || "",
        kontak_email: kontakData.kontak_email || "",
        kontak_maps: kontakData.kontak_maps || "",
      });
      setKontakId(kontakData.id);
    }
  }, [kontakData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!kontakId) {
      setSubmitError("ID Kontak tidak ditemukan. Tidak dapat menyimpan.");
      return;
    }
    if (!formData.kontak_alamat || !formData.kontak_telepon || !formData.kontak_email) {
      setSubmitError("Alamat, Telepon, dan Email tidak boleh kosong.");
      return;
    }

    setIsSubmitting(true); // Cast formData to KontakUpdatePayload
    const result = await updateKontak(kontakId, formData);
    setIsSubmitting(false);

    if (result) {
      setSubmitSuccess("Data kontak berhasil diperbarui!");
      // Optionally re-fetch or rely on context update
      // fetchKontak();
    } else {
      // Error is already set in context, but we can display a specific submit error too
      setSubmitError(
        error || "Gagal memperbarui data kontak. Silakan coba lagi."
      );
    }
  };

  if (loading && !kontakData) {
    return <div className="container mx-auto p-8">Memuat data kontak...</div>;
  }

  if (error && !kontakData && !loading) {
    return (
      <div className="container mx-auto p-8 text-red-500">
        Gagal memuat data kontak: {error}. Coba segarkan halaman.
      </div>
    );
  }

  if (!kontakData && !loading) {
    return (
      <div className="container mx-auto p-8 text-textcolor">
        Data kontak tidak ditemukan. Mungkin perlu dibuat terlebih dahulu
        melalui sistem atau backend.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold text-textcolor mb-6">
        Edit Informasi Kontak
      </h1>
      {submitError && (
        <p className="text-red-500 bg-red-100 p-3 rounded mb-4">
          {submitError}
        </p>
      )}
      {submitSuccess && (
        <p className="text-green-500 bg-green-100 p-3 rounded mb-4">
          {submitSuccess}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <Label htmlFor="kontak_alamat" className="text-textcolor">
            Alamat
          </Label>
          <Textarea
            id="kontak_alamat"
            name="kontak_alamat"
            value={formData.kontak_alamat}
            onChange={handleChange}
            required
            className="mt-1 w-full text-textcolor"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="kontak_telepon" className="text-textcolor">
            Telepon
          </Label>
          <Input // Changed name to match KontakUpdatePayload
            type="text"
            id="kontak_telepon"
            name="kontak_telepon"
            value={formData.kontak_telepon}
            onChange={handleChange}
            required
            className="mt-1 w-full text-textcolor"
          />
        </div>
        <div>
          <Label htmlFor="kontak_email" className="text-textcolor">
            Email
          </Label>
          <Input // Changed name to match KontakUpdatePayload
            type="email"
            id="kontak_email"
            name="kontak_email"
            value={formData.kontak_email}
            onChange={handleChange}
            required
            className="mt-1 w-full text-textcolor"
          />
        </div>
        <div>
          <Label htmlFor="kontak_maps" className="text-textcolor">
            URL Google Maps Embed
          </Label>
          <Textarea // Changed name to match KontakUpdatePayload
            id="kontak_maps"
            name="kontak_maps"
            value={formData.kontak_maps}
            onChange={handleChange}
            className="mt-1 w-full text-textcolor"
            rows={4}
            placeholder="https://www.google.com/maps/embed?pb=..."
          />
        </div>
        <div>
          <Button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default KontakEditPage;
