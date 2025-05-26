<?php

namespace App\Http\Controllers;

use App\Models\Bidang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BidangController extends Controller
{
    //
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bidang = Bidang::all();
        return response()->json($bidang);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'bidang_nama' => 'required|string|unique:bidangs,bidang_nama', // Pastikan nama bidang unik
        ]);

        $bidang = new Bidang();
        $bidang->bidang_nama = $request->bidang_nama;
        $bidang->save();

        return response()->json($bidang, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $bidang = Bidang::find($id);
        if (!$bidang) {
            return response()->json(['message' => 'Bidang tidak ditemukan'], 404);
        }
        return response()->json($bidang);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $bidang = Bidang::find($id);
        if (!$bidang) {
            return response()->json(['message' => 'Bidang tidak ditemukan'], 404);
        }

        $request->validate([
            'bidang_nama' => 'required|string|unique:bidangs,bidang_nama,' . $bidang->id, // Unik, kecuali untuk dirinya sendiri
        ]);

        $bidang->bidang_nama = $request->bidang_nama;
        $bidang->save();

        return response()->json($bidang);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $bidang = Bidang::find($id);

            if (!$bidang) {
                Log::warning("Bidang dengan ID {$id} tidak ditemukan");
                return response()->json(['message' => 'Bidang tidak ditemukan'], 404);
            }

            // Tambahan: Periksa apakah bidang ini masih digunakan oleh anggota sebelum menghapus
            if ($bidang->anggota()->exists()) {
                return response()->json(['message' => 'Bidang tidak dapat dihapus karena masih digunakan oleh anggota.'], 409); // 409 Conflict
            }

            $bidang->delete();
            Log::info("Bidang dengan ID {$id} berhasil dihapus");
            return response()->json(['message' => 'Bidang berhasil dihapus'], 200);

        } catch (\Exception $e) {
            Log::error("Error saat menghapus bidang: " . $e->getMessage());
            return response()->json(['message' => 'Terjadi kesalahan saat menghapus bidang', 'error' => $e->getMessage()], 500);
        }
    }
}