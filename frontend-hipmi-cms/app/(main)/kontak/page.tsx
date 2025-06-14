"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { usePublic } from "@/contexts/PublicContext";
import api from "@/services/api"; // Import service API Anda

const Kontak = () => {
  const {
    kontakData,
    fetchKontak,
    loading: contextLoading,
    error: contextError,
  } = usePublic();
  const [formData, setFormData] = useState({
    pesan_nama: "",
    pesan_email: "",
    pesan_subjek: "",
    pesan_isi: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    fetchKontak();
  }, [fetchKontak]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const response = await api.post("/public/pesan", formData);
      setSubmitSuccess(response.data.message || "Pesan Anda berhasil dikirim!");
      setFormData({
        pesan_nama: "",
        pesan_email: "",
        pesan_subjek: "",
        pesan_isi: "",
      }); // Reset form
    } catch (err: any) {
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          // Handle validation errors
          const errors = Object.values(err.response.data.errors)
            .flat()
            .join(". ");
          setSubmitError(`Gagal mengirim pesan: ${errors}`);
        } else {
          setSubmitError(
            err.response.data.message ||
              "Terjadi kesalahan saat mengirim pesan."
          );
        }
      } else {
        setSubmitError(
          "Tidak dapat terhubung ke server. Silakan coba lagi nanti."
        );
      }
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative py-32 md:py-44 min-h-screen 
                 bg-gradient-to-br from-secondary to-accent"
    >
      <div
        className="absolute inset-0 z-0 bg-[url('/assets/patterns/geometric-lines.svg')] bg-repeat opacity-10"
        aria-hidden="true"
      ></div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Hubungi Kami
          </h1>
          <p className="text-white/80 md:text-lg max-w-2xl mx-auto">
            Kami senang mendengar dari Anda! Baik itu pertanyaan, saran, atau
            peluang kolaborasi, jangan ragu untuk menghubungi tim HIPMI Kota
            Cirebon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Kolom Informasi Kontak */}
          <div className="lg:col-span-1 bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6">
            {/* Warna textcolor untuk judul di dalam kartu putih */}
            <h2 className="text-2xl font-semibold text-textcolor mb-4">
              Informasi Kontak
            </h2>

            <div className="flex items-start space-x-4">
              {/* Ikon bisa menggunakan warna accent atau primary, tergantung mana yang lebih kontras atau sesuai */}
              <FaMapMarkerAlt className="text-accent text-2xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-textcolor">
                  Alamat Sekretariat
                </h3>
                {contextLoading && !kontakData && (
                  <p className="text-gray-600 text-sm">Memuat alamat...</p>
                )}
                {kontakData && (
                  <p className="text-gray-600 text-sm">
                    {kontakData.kontak_alamat}
                  </p>
                )}
                {!contextLoading && !kontakData && (
                  <p className="text-gray-600 text-sm">
                    Jl. Contoh Alamat No. 123, Kota Cirebon, Jawa Barat, 45111
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaPhoneAlt className="text-accent text-2xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-textcolor">Telepon</h3>
                {/* Hover bisa ke warna accent atau primary */}
                {contextLoading && !kontakData && (
                  <p className="text-gray-600 text-sm">Memuat telepon...</p>
                )}
                {kontakData && (
                  <p className="text-gray-600 text-sm hover:text-accent transition-colors">
                    <a href={`tel:${kontakData.kontak_telepon}`}>
                      {kontakData.kontak_telepon}
                    </a>
                  </p>
                )}
                {!contextLoading && !kontakData && (
                  <p className="text-gray-600 text-sm hover:text-accent transition-colors">
                    <a href="tel:+62231123456">+62 231 123456</a>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-accent text-2xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-textcolor">Email</h3>
                {contextLoading && !kontakData && (
                  <p className="text-gray-600 text-sm">Memuat email...</p>
                )}
                {kontakData && (
                  <p className="text-gray-600 text-sm hover:text-accent transition-colors">
                    <a href={`mailto:${kontakData.kontak_email}`}>
                      {kontakData.kontak_email}
                    </a>
                  </p>
                )}
                {!contextLoading && !kontakData && (
                  <p className="text-gray-600 text-sm hover:text-accent transition-colors">
                    <a href="mailto:info@hipmicirebon.org">
                      info@hipmicirebon.org
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-6 h-64 md:h-72 rounded-lg overflow-hidden shadow-md">
              {contextLoading && !kontakData && (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p>Memuat peta...</p>
                </div>
              )}
              {kontakData && kontakData.kontak_maps && (
                <iframe
                  src={kontakData.kontak_maps}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi HIPMI Kota Cirebon"
                ></iframe>
              )}
              {(!kontakData || !kontakData.kontak_maps) && !contextLoading && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.3660000000003!2d108.55880000000001!3d-6.720000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1d8ebc1e231d%3A0x3c8a6b75f9b0b075!2sAlun-Alun%20Kejaksan%20Cirebon!5e0!3m2!1sid!2sid!4v1678886400000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi HIPMI Kota Cirebon Default"
                ></iframe>
              )}
            </div>
            {contextError && (
              <p className="text-red-500 text-xs mt-2">
                Gagal memuat data kontak: {contextError}
              </p>
            )}
          </div>

          {/* Kolom Formulir Kontak */}
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-textcolor mb-6">
              Kirim Pesan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="pesan_nama"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Lengkap
                </label>
                {/* Fokus input bisa ke warna accent atau primary */}
                <Input
                  type="text"
                  name="pesan_nama"
                  id="pesan_nama"
                  value={formData.pesan_nama}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent transition-colors text-textcolor"
                />
              </div>
              <div>
                <label
                  htmlFor="pesan_email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Alamat Email
                </label>
                <Input
                  type="email"
                  name="pesan_email"
                  id="pesan_email"
                  value={formData.pesan_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent transition-colors text-textcolor"
                />
              </div>
              <div>
                <label
                  htmlFor="pesan_subjek"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subjek
                </label>
                <Input
                  type="text"
                  name="pesan_subjek"
                  id="pesan_subjek"
                  value={formData.pesan_subjek}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent transition-colors text-textcolor"
                />
              </div>
              <div>
                <label
                  htmlFor="pesan_isi"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pesan Anda
                </label>
                <Textarea
                  name="pesan_isi"
                  id="pesan_isi"
                  rows={5}
                  value={formData.pesan_isi}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent transition-colors text-textcolor"
                />
              </div>
              {submitSuccess && (
                <p className="text-sm text-green-600 bg-green-100 p-3 rounded-md">
                  {submitSuccess}
                </p>
              )}
              {submitError && (
                <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">
                  {submitError}
                </p>
              )}
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-70"
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kontak;
