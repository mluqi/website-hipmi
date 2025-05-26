"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import api from "@/services/api";

export interface AnggotaItem {
  id: number;
  anggota_nama: string;
  anggota_email: string;
  anggota_telepon: string;
  anggota_jabatan: string | number;
  anggota_bidang: string | number;
  anggota_jabatan_nama?: string | null;
  anggota_bidang_nama?: string | null;
  anggota_perusahaan: string;
  anggota_perusahaan_alamat: string;
  anggota_perusahaan_logo: string | null;
  anggota_perusahaan_website: string | null;
  anggota_pengalaman: string;
  anggota_foto: string | null;
  anggota_instagram: string | null;
  anggota_facebook: string | null;
  anggota_linkedin: string | null;
  anggota_tiktok: string | null;
}

export interface BeritaItem {
  id: number;
  berita_judul: string;
  berita_isi: string;
  berita_foto: string | null;
  berita_tanggal: string;
  berita_kategori: string;
}

export interface KegiatanItem {
  id: number;
  kegiatan_judul: string;
  kegiatan_isi: string;
  kegiatan_foto: string | null;
  kegiatan_kategori: string;
  kegiatan_tanggal: string;
  kegiatan_waktu: string;
  kegiatan_lokasi: string | null;
}

export interface BidangItem {
  id: number;
  bidang_nama: string;
}

export interface JabatanItem {
  id: number;
  jabatan_name: string;
}

export interface SejarahItem {
  id?: number;
  sejarah_konten: string;
  sejarah_foto: string | null;
}

export interface LandingPageComponentItem {
  id: number;
  section: string;
  key_name: string;
  value: string | null;
  type: "text" | "image";
  sort_order?: number | null;
  created_at?: string;
  updated_at?: string;
}

export interface LandingPageSectionComponents {
  [key_name: string]: LandingPageComponentItem;
}

export interface LandingPageData {
  [section: string]: LandingPageSectionComponents;
}

export interface KontakItem {
  id: number;
  alamat: string;
  telepon: string;
  email: string;
  maps: string | null;
}

interface PublicContextType {
  anggotaList: AnggotaItem[];
  beritaList: BeritaItem[];
  kegiatanList: KegiatanItem[];
  bidangList: BidangItem[];
  jabatanList: JabatanItem[];
  error: string | null;
  sejarahData: SejarahItem | null;
  loading: boolean;
  kontakData: KontakItem | null;
  landingPageData: LandingPageData;
  fetchAnggota: () => Promise<void>;
  fetchAnggotaById: (id: number) => Promise<AnggotaItem | null>;
  fetchBerita: () => Promise<void>;
  fetchBeritaById: (id: number) => Promise<BeritaItem | null>;
  fetchKegiatan: () => Promise<void>;
  fetchKegiatanById: (id: number) => Promise<KegiatanItem | null>;
  fetchBidang: () => Promise<void>;
  fetchBidangById: (id: number) => Promise<BidangItem | null>;
  fetchJabatan: () => Promise<void>;
  fetchJabatanById: (id: number) => Promise<JabatanItem | null>;
  fetchSejarah: () => Promise<void>;
  fetchLandingPageComponents: () => Promise<void>;
  fetchKontak: () => Promise<void>;
  updateKontak: (
    id: number,
    data: Partial<Omit<KontakItem, "id" | "created_at" | "updated_at">>
  ) => Promise<KontakItem | null>;
  updateLandingPageComponent: (
    id: number,
    data: Partial<
      Omit<LandingPageComponentItem, "id" | "created_at" | "updated_at">
    > & { value?: string | File | null; type: "text" | "image" }
  ) => Promise<LandingPageComponentItem | null>;
}

const PublicContext = createContext<PublicContextType | null>(null);

export const PublicProvider = ({ children }: { children: ReactNode }) => {
  const [anggotaList, setAnggotaList] = useState<AnggotaItem[]>([]);
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);
  const [kegiatanList, setKegiatanList] = useState<KegiatanItem[]>([]);
  const [bidangList, setBidangList] = useState<BidangItem[]>([]);
  const [jabatanList, setJabatanList] = useState<JabatanItem[]>([]);
  const [sejarahData, setSejarahData] = useState<SejarahItem | null>(null);
  const [kontakData, setKontakData] = useState<KontakItem | null>(null);
  const [landingPageData, setLandingPageData] = useState<LandingPageData>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAnggota = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/public/anggota");
      setAnggotaList(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat mengambil data anggota"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAnggotaById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/public/anggota/${id}`);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Terjadi kesalahan saat mengambil data anggota dengan ID ${id}`
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBerita = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/public/berita");
      setBeritaList(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat mengambil data berita"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBeritaById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/public/berita/${id}`);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Terjadi kesalahan saat mengambil data berita dengan ID ${id}`
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchKegiatan = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/public/kegiatan");
      setKegiatanList(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat mengambil data kegiatan"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchKegiatanById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/public/kegiatan/${id}`);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Terjadi kesalahan saat mengambil data kegiatan dengan ID ${id}`
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBidang = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/public/bidang");
      setBidangList(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat mengambil data bidang"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBidangById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/public/bidang/${id}`);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Terjadi kesalahan saat mengambil data bidang dengan ID ${id}`
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJabatan = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/public/jabatan");
      setJabatanList(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat mengambil data jabatan"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJabatanById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/public/jabatan/${id}`);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `Terjadi kesalahan saat mengambil data jabatan dengan ID ${id}`
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSejarah = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/public/sejarah");
      if (response.data && response.data.length > 0) {
        setSejarahData(response.data[0]);
      } else {
        setSejarahData(null);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat mengambil data sejarah"
      );
      setSejarahData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchKontak = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/public/kontak");
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setKontakData(response.data[0]); // Assuming the first entry is the relevant one
      } else {
        setKontakData(null);
        console.warn("No contact data found or data format is unexpected.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat mengambil data kontak"
      );
      setKontakData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateKontak = useCallback(
    async (
      id: number,
      data: Partial<Omit<KontakItem, "id" | "created_at" | "updated_at">>
    ) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        // Append all fields from data to formData
        (Object.keys(data) as Array<keyof typeof data>).forEach((key) => {
          const value = data[key];
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          } else if (value === null) {
            formData.append(key, ""); // Send empty string for null, backend can interpret as null
          }
        });
        formData.append("_method", "PUT");

        const response = await api.post(`/kontak/${id}`, formData); // Using POST with _method: 'PUT'
        
        // Refresh kontak data in context
        await fetchKontak(); 
        // Or, if the response contains the updated item:
        // setKontakData(response.data as KontakItem);
        return response.data as KontakItem;
      } catch (err: any) {
        console.error("Error updating kontak data:", err.response?.data || err.message);
        setError(
          err.response?.data?.message ||
            err.message ||
            `Terjadi kesalahan saat memperbarui data kontak dengan ID ${id}`
        );
        return null;
      } finally {
        setLoading(false);
      }
    }, [fetchKontak]);

  const fetchLandingPageComponents = useCallback(async () => {
    setLoading(true); // Or use specific landingPageLoading
    setError(null); // Or use specific landingPageError
    try {
      const response = await api.get("/public/content");
      setLandingPageData(response.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Terjadi kesalahan saat mengambil data komponen landing page"
      );
      setLandingPageData({});
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLandingPageComponent = useCallback(
    async (
      id: number,
      data: Partial<
        Omit<LandingPageComponentItem, "id" | "created_at" | "updated_at">
      > & { value?: string | File | null; type: "text" | "image" }
    ) => {
      setLoading(true);
      setError(null);
      try {
        const formData = new FormData();
        formData.append("type", data.type);

        if (data.section !== undefined)
          formData.append("section", data.section);
        if (data.key_name !== undefined)
          formData.append("key_name", data.key_name);

        if (data.sort_order !== undefined) {
          formData.append(
            "sort_order",
            data.sort_order === null ? "" : String(data.sort_order)
          );
        }

        if (Object.prototype.hasOwnProperty.call(data, "value")) {
          if (data.type === "image") {
            if (data.value instanceof File) {
              formData.append("value", data.value);
            } else if (data.value === null) {
              formData.append("value", "");
            }
          } else {
            // type === "text"
            if (data.value === null) {
              formData.append("value", "");
            } else {
              formData.append("value", data.value as string);
            }
          }
        }

        formData.append("_method", "PUT");

        const response = await api.post(`/content/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        await fetchLandingPageComponents();
        return response.data as LandingPageComponentItem;
      } catch (err: any) {
        console.error(
          "Error updating landing page component:",
          err.response?.data || err.message
        );
        setError(
          err.response?.data?.message ||
            err.message ||
            `Terjadi kesalahan saat memperbarui komponen landing page dengan ID ${id}`
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchLandingPageComponents]
  );

  const contextValue: PublicContextType = {
    anggotaList,
    beritaList,
    kegiatanList,
    bidangList,
    jabatanList,
    error,
    sejarahData,
    loading,
    kontakData,
    landingPageData,
    fetchAnggota,
    fetchAnggotaById,
    fetchBerita,
    fetchBeritaById,
    fetchKegiatan,
    fetchKegiatanById,
    fetchBidang,
    fetchBidangById,
    fetchJabatan,
    fetchJabatanById,
    fetchSejarah,
    fetchLandingPageComponents,
    fetchKontak,
    updateLandingPageComponent,
    updateKontak,
  };

  return (
    <PublicContext.Provider value={contextValue}>
      {children}
    </PublicContext.Provider>
  );
};

export const usePublic = () => {
  const context = useContext(PublicContext);
  if (!context) {
    throw new Error("usePublic must be used within a PublicProvider");
  }
  return context;
};
