<?php

namespace App\Http\Controllers;

use App\Models\Bidang; 
use App\Models\Jabatan;
use App\Models\Anggota;
use App\Models\Kegiatan;
use App\Models\Berita;
use App\Models\Sejarah;
use App\Models\Kontak;
use App\Models\Pesan;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function getAllBerita(Request $request)
    {
        try {
            $query = Berita::query();

            if ($request->has('search') && $request->input('search') != '') {
                $searchTerm = $request->input('search');
                $query->where('berita_judul', 'LIKE', '%' . $searchTerm . '%');
            }

            $query->orderBy('berita_tanggal', 'desc')->orderBy('id', 'desc');

            $perPage = $request->input('per_page', 9); 
            $berita = $query->paginate($perPage);

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

    public function getAllAnggota(Request $request)
    {
        try {
            $query = Anggota::with(['jabatan', 'bidang']);
    
            // Default order by ID ascending (pertama ditambahkan akan muncul duluan)
            $query->orderBy('id', 'asc');
    
            $perPage = $request->input('per_page', 50); // Default 50 item jika tidak ada per_page spesifik, untuk memastikan data cukup untuk filter di frontend
            $anggotaPaginated = $query->paginate($perPage);

            // Map data untuk menambahkan nama jabatan dan bidang
            $anggotaPaginated->getCollection()->transform(function ($item) {
                $item->anggota_jabatan_nama = $item->jabatan ? $item->jabatan->jabatan_name : null;
                $item->anggota_bidang_nama = $item->bidang ? $item->bidang->bidang_nama : null;
                return $item;
            });
            return response()->json($anggotaPaginated);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengambil data anggota', 'error' => $e->getMessage()], 500);
        }
    }

    public function getAnggotaById($id)
    {
        try{
            $anggota = Anggota::with(['jabatan', 'bidang'])->find($id);
            if (!$anggota) {
                return response()->json(['message' => 'Anggota tidak ditemukan'], 404);
            }
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

    public function addPesan(Request $request)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'pesan_nama' => 'required|string|max:255',
            'pesan_email' => 'required|email|max:255',
            'pesan_subjek' => 'required|string|max:255',
            'pesan_isi' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            Pesan::create($request->all());
            return response()->json(['message' => 'Pesan Anda berhasil dikirim!'], 201);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Gagal menyimpan pesan: ' . $e->getMessage());
            return response()->json(['message' => 'Terjadi kesalahan saat mengirim pesan.'], 500);
        }
    }
}
