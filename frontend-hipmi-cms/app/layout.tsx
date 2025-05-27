import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { BeritaProvider } from "@/contexts/BeritaContext";
import { KegiatanProvider } from "@/contexts/KegiatannContext";
import { AnggotaProvider } from "@/contexts/AnggotaContext";
import { JabatanProvider } from "@/contexts/JabatanContext";
import { BidangProvider } from "@/contexts/BidangContext";
import { KategoriProvider } from "@/contexts/KategoriContext";
import { PublicProvider } from "@/contexts/PublicContext";
import { CustomProvider } from "@/contexts/CustomContext";
import { PesanProvider } from "@/contexts/PesanContext";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Hipmi Kota Cirebon",
  description: "hipmi",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={poppinsFont.variable}>
        <main>
          <AuthProvider>
            <BeritaProvider>
              <KegiatanProvider>
                <AnggotaProvider>
                  <JabatanProvider>
                    <BidangProvider>
                      <KategoriProvider>
                        <PesanProvider>
                          <CustomProvider>
                            <PublicProvider>{children}</PublicProvider>
                          </CustomProvider>
                        </PesanProvider>
                      </KategoriProvider>
                    </BidangProvider>
                  </JabatanProvider>
                </AnggotaProvider>
              </KegiatanProvider>
            </BeritaProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
