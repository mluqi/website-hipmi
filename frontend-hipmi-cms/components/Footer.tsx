"use client"; // Tambahkan "use client" karena kita akan menggunakan hooks

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { usePublic } from "@/contexts/PublicContext"; // Impor usePublic

const urlBase =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev3-p3.palindo.id";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { landingPageData, fetchLandingPageComponents } = usePublic(); // Ambil data dari context

  // Ambil data spesifik untuk footer, dengan fallback
  const footerContent = landingPageData.footer;
  const logoImageUrl = footerContent?.logo_image?.value
    ? `${urlBase}/storage/${footerContent.logo_image.value}`
    : "/assets/logo.png"; // Fallback ke logo default jika ada
  const description =
    footerContent?.description?.value ||
    "Deskripsi default footer jika tidak ada data.";
  const addressLine1 =
    footerContent?.address_line_1?.value || "Jl. Contoh No. 1";
  const addressLine2 =
    footerContent?.address_line_2?.value || "Kota Contoh, Negara Contoh";
  const emailAddress =
    footerContent?.email_address?.value || "info@example.com";
  const facebookUrl = footerContent?.facebook_url?.value || "#";
  const instagramUrl = footerContent?.instagram_url?.value || "#";
  const twitterUrl = footerContent?.twitter_url?.value || "#";
  const tiktokUrl = footerContent?.tiktok_url?.value || "#";

  React.useEffect(() => {
    if (!footerContent) fetchLandingPageComponents(); // Fetch data jika belum ada
  }, [footerContent, fetchLandingPageComponents]);

  return (
    <>
      <footer
        className="relative py-10
                 bg-gradient-to-br from-secondary to-slate-800"
      >
        {/* Wrapper untuk konten utama agar berada di atas background pattern */}
        <div className="relative z-10">
          <div className="container mx-auto px-4">
            {" "}
            {/* Tambahkan px-4 untuk konsistensi padding container */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-12 mb-10 xl:mb-12 items-start pt-8 border-accent/30">
              {/* Kolom 1: Logo dan Deskripsi Singkat */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <Link href="/" className="mb-4 inline-block">
                  <Image
                    src={logoImageUrl}
                    alt={
                      footerContent?.logo_image?.key_name || "Logo Perusahaan"
                    }
                    width={500}
                    height={500}
                    className="w-44 h-auto object-contain"
                  />
                </Link>
                <p className="text-sm text-accent/80 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Kolom 2: Link Pintas */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-xl font-semibold text-accent mb-5">
                  Tautan Pintas
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="text-sm text-accent/80 hover:text-accent transition-colors duration-300"
                    >
                      Beranda
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/keanggotaan"
                      className="text-sm text-accent/80 hover:text-accent transition-colors duration-300"
                    >
                      Keanggotaan
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/berita-dan-kegiatan"
                      className="text-sm text-accent/80 hover:text-accent transition-colors duration-300"
                    >
                      Berita dan Kegiatan
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/kontak"
                      className="text-sm text-accent/80 hover:text-accent transition-colors duration-300"
                    >
                      Hubungi Kami
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Kolom 3: Informasi Kontak */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-xl font-semibold text-accent mb-5">
                  Alamat Kami
                </h3>
                <p className="text-sm text-accent/80 mb-1 leading-relaxed">
                  {addressLine1}
                </p>
                <p className="text-sm text-accent/80 mb-3 leading-relaxed">
                  {addressLine2}
                </p>
                <h3 className="text-xl font-semibold text-accent mb-3 mt-2">
                  Email
                </h3>
                <Link
                  href={`mailto:${emailAddress}`}
                  className="text-sm text-accent/80 hover:text-accent transition-colors duration-300"
                >
                  {emailAddress}
                </Link>
              </div>
              {/* Kolom Media Sosial */}
              <div className=" mb-8 text-center md:text-left">
                <h3 className="text-xl font-semibold text-accent mb-5">
                  Ikuti Kami
                </h3>
                <div className="flex justify-center md:justify-start space-x-5">
                  <Link
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Kesandung Rindu"
                    className="text-accent/80 hover:text-accent transition-colors duration-300"
                  >
                    <FaFacebookF size={22} />
                  </Link>
                  <Link
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Kesandung Rindu"
                    className="text-accent/80 hover:text-accent transition-colors duration-300"
                  >
                    <FaInstagram size={22} />
                  </Link>
                  <Link
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter) Kesandung Rindu"
                    className="text-accent/80 hover:text-accent transition-colors duration-300"
                  >
                    <FaTwitter size={22} />
                  </Link>
                  <Link
                    href={tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok Kesandung Rindu"
                    className="text-accent/80 hover:text-accent transition-colors duration-300"
                  >
                    <FaTiktok size={22} />
                  </Link>
                </div>
              </div>
            </div>
            {/* Garis Pemisah dan Hak Cipta dipindahkan ke dalam wrapper z-10 */}
            <div className="border-t border-accent/30 pt-8">
              <p className="text-white text-center text-sm">
                &copy; {currentYear} Hipmi Cirebon. All rights reserved.
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 z-0 
                   bg-[url('/assets/patterns/geometric-lines.svg')] bg-repeat 
                   opacity-10"
        ></div>
      </footer>
    </>
  );
};

export default Footer;
