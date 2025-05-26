<?php

namespace App\Http\Controllers;

use App\Models\Bidang; 
use App\Models\Jabatan;
use App\Models\Anggota;
use App\Models\Kegiatan;
use App\Models\Berita;
use App\Models\Sejarah;
use App\Models\Kontak;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function getAllBerita()
    {
        try {
            $berita = Berita::all(); 
            return response()->json($berita);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data berita', 'error' => $e->getMessage()], 500);
        }
    }

    public function getBeritaById($id)
    {
        try {
            $berita = Berita::find($id);
            if (!$berita) {
                return response()->json(['message' => 'Berita tidak ditemukan'], 404);
            }
            return response()->json($berita);
        }catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data berita', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAllKegiatan()
    {
        try {
            $kegiatan = Kegiatan::all(); 
            return response()->json($kegiatan);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data kegiatan', 'error' => $e->getMessage()], 500);
        }
    }

    public function getKegiatanById($id)
    {
        try {
            $kegiatan = Kegiatan::find($id);
            if (!$kegiatan) {
                return response()->json(['message' => 'Kegiatan tidak ditemukan'], 404);
            }
            return response()->json($kegiatan);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data kegiatan', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAllAnggota()
    {
        try {
            // Eager load relasi jabatan dan bidang
            $anggota = Anggota::with(['jabatan', 'bidang'])->get()->map(function ($item) {
                $item->anggota_jabatan_nama = $item->jabatan ? $item->jabatan->jabatan_name : null;
                $item->anggota_bidang_nama = $item->bidang ? $item->bidang->bidang_nama : null;

                return $item;
            });
            return response()->json($anggota);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data anggota', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAnggotaById($id)
    {
        try{
            // Eager load relasi jabatan dan bidang
            $anggota = Anggota::with(['jabatan', 'bidang'])->find($id);
            if (!$anggota) {
                return response()->json(['message' => 'Anggota tidak ditemukan'], 404);
            }
            // Ganti ID dengan nama dari relasi
            $anggota->anggota_jabatan_nama = $anggota->jabatan ? $anggota->jabatan->jabatan_name : null;
            $anggota->anggota_bidang_nama = $anggota->bidang ? $anggota->bidang->bidang_nama : null;
            // Hapus objek relasi jika tidak ingin dikirim ke frontend
            // unset($anggota->jabatan);
            // unset($anggota->bidang);
            return response()->json($anggota);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data anggota', 'error' => $e->getMessage()], 500);
        }
    }
    
    public function getAllBidang()
    {
        try {
            $bidang = Bidang::all();
            return response()->json($bidang);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data bidang', 'error' => $e->getMessage()], 500);
        }
    }

    public function getBidangById($id)
    {
        try {
            $bidang = Bidang::find($id);
            if (!$bidang) {
                return response()->json(['message' => 'Bidang tidak ditemukan'], 404);
            }
            return response()->json($bidang);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data bidang', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAllJabatan()
    {
        try {
            $jabatan = Jabatan::all(); // Atau query lain yang sesuai
            return response()->json($jabatan);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data jabatan', 'error' => $e->getMessage()], 500);
        }
    }

    public function getJabatanById($id)
    {
        try {
            $jabatan = Jabatan::find($id);
            if (!$jabatan) {
                return response()->json(['message' => 'Jabatan tidak ditemukan'], 404);
            }
            return response()->json($jabatan);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data jabatan', 'error' => $e->getMessage()], 500);
        }
    }

    public function getSejarahContent()
    {
        try{
            $sejarah = Sejarah::all();
            return response()->json($sejarah);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data sejarah', 'error' => $e->getMessage()], 500);
        }
    }

    public function getKontakContent()
    {
        try{
            $kontak = Kontak::all();
            return response()->json($kontak);
        }
        catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data kontak', 'error' => $e->getMessage()], 500);
        }
    }
}
