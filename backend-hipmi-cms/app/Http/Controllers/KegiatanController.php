<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class KegiatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Kegiatan::query();

        // Search functionality (opsional)
        if ($request->has('search') && $request->input('search') != '') {
            $searchTerm = $request->input('search');
            $query->where('kegiatan_judul', 'LIKE', '%' . $searchTerm . '%');
        }

        // Order by date descending
        $query->orderBy('kegiatan_tanggal', 'desc')->orderBy('id', 'desc');
        $perPage = $request->input('per_page', 10); // Default 10 item per halaman
        $kegiatan = $query->paginate($perPage);
        return response()->json($kegiatan);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string',
            'isi' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'kategori' => 'required|string',
            'tanggal' => 'required|date',
            'waktu' => 'required|date_format:H:i',
            'lokasi' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('kegiatan', 'public');
        } else {
            $fotoPath = null;
        }

        $kegiatan = Kegiatan::create([
            'kegiatan_judul' => $request->judul,
            'kegiatan_isi' => $request->isi,
            'kegiatan_foto' => $fotoPath,
            'kegiatan_kategori' => $request->kategori,
            'kegiatan_tanggal' => $request->tanggal,
            'kegiatan_waktu' => $request->waktu,
            'kegiatan_lokasi' => $request->lokasi, 
        ]);

        return response()->json($kegiatan, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $kegiatan = Kegiatan::find($id);
        if (!$kegiatan) {
            return response()->json(['message' => 'Kegiatan tidak ditemukan'], 404);
        }
        return response()->json($kegiatan);
    }

    /**
     * Update the specified resource in storage.     
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'judul' => 'required|string',
            'isi' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'kategori' => 'required|string',
            'tanggal' => 'required|date',
            'waktu' => 'required|date_format:H:i',
            'lokasi' => 'nullable|string|max:255', 
        ]);

        $kegiatan = Kegiatan::find($id);
        if(!$kegiatan) {
            return response()->json(['message' => 'Kegiatan tidak ditemukan'], 404);
        }

        $fotoPath = $kegiatan->kegiatan_foto;

        if ($request->hasFile('foto')) {
            if ($kegiatan->kegiatan_foto) {
                Storage::disk('public')->delete($kegiatan->kegiatan_foto);
            }
            $fotoPath = $request->file('foto')->store('kegiatan', 'public');
        }

        $kegiatan->update([
            'kegiatan_judul' => $request->judul,
            'kegiatan_isi' => $request->isi,
            'kegiatan_foto' => $fotoPath, 
            'kegiatan_kategori' => $request->kategori,
            'kegiatan_tanggal' => $request->tanggal,
            'kegiatan_waktu' => $request->waktu,
            'kegiatan_lokasi' => $request->lokasi,
        ]);

        return response()->json($kegiatan);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $kegiatan = Kegiatan::find($id);
            
            if (!$kegiatan) {
                Log::warning("Kegiatan dengan ID {$id} tidak ditemukan");
                return response()->json(['message' => 'Kegiatan tidak ditemukan'], 404);
            }
            
            // Hapus foto terkait jika ada
            if ($kegiatan->kegiatan_foto) {
                if (Storage::disk('public')->exists($kegiatan->kegiatan_foto)) {
                    Storage::disk('public')->delete($kegiatan->kegiatan_foto);
                    Log::info("Foto kegiatan dihapus: {$kegiatan->kegiatan_foto}");
                } else {
                    Log::warning("File foto kegiatan tidak ditemukan di storage: {$kegiatan->kegiatan_foto}");
                }
            }
            
            $deleted = $kegiatan->delete();
            
            if ($deleted) {
                Log::info("Kegiatan dengan ID {$id} berhasil dihapus");
                return response()->json([
                    'message' => 'Kegiatan berhasil dihapus',
                    'deleted_id' => $id
                ], 200);
            } else {
                Log::error("Gagal menghapus kegiatan dengan ID {$id}");
                return response()->json(['message' => 'Gagal menghapus kegiatan'], 500);
            }
        } catch (\Exception $e) {
            Log::error("Error saat menghapus kegiatan: " . $e->getMessage());
            return response()->json(['message' => 'Terjadi kesalahan saat menghapus kegiatan', 'error' => $e->getMessage()], 500);
        }
    }
}
