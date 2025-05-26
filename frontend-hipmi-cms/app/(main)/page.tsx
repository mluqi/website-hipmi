import AboutUs from "@/components/AboutUs";
import Hero from "@/components/Hero";
import VisiMisi from "@/components/VisiMisi";
import StrukturOrganisasi from "@/components/StrukturOrganisasi";
import Berita from "@/components/Berita";
import Anggota from "@/components/Anggota";
import PhotoSlide from "@/components/PhotoSlide";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <VisiMisi />
      <StrukturOrganisasi />
      <Berita />
      <PhotoSlide />
      <Anggota />
    </>
  );
}
