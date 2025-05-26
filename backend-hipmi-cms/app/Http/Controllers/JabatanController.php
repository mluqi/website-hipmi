<?php

namespace App\Http\Controllers;

use App\Models\Jabatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class JabatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jabatan = Jabatan::all();
        return response()->json($jabatan);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'jabatan_name' => 'required|string|unique:jabatans,jabatan_name', // Pastikan nama jabatan unik
        ]);

        $jabatan = new Jabatan();
        $jabatan->jabatan_name = $request->jabatan_name;
        $jabatan->save();

        return response()->json($jabatan, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $jabatan = Jabatan::find($id);
        if (!$jabatan) {
            return response()->json(['message' => 'Jabatan tidak ditemukan'], 404);
        }
        return response()->json($jabatan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $jabatan = Jabatan::find($id);
        if (!$jabatan) {
            return response()->json(['message' => 'Jabatan tidak ditemukan'], 404);
        }

        $request->validate([
            'jabatan_name' => 'required|string|unique:jabatans,jabatan_name,' . $jabatan->id, // Unik, kecuali untuk dirinya sendiri
        ]);

        $jabatan->jabatan_name = $request->jabatan_name;
        $jabatan->save();

        return response()->json($jabatan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $jabatan = Jabatan::find($id);

            if (!$jabatan) {
                Log::warning("Jabatan dengan ID {$id} tidak ditemukan");
                return response()->json(['message' => 'Jabatan tidak ditemukan'], 404);
            }

            // Tambahan: Periksa apakah jabatan ini masih digunakan oleh anggota sebelum menghapus
            // if ($jabatan->anggota()->exists()) {
            //     return response()->json(['message' => 'Jabatan tidak dapat dihapus karena masih digunakan oleh anggota.'], 409); // 409 Conflict
            // }

            $jabatan->delete();
            Log::info("Jabatan dengan ID {$id} berhasil dihapus");
            return response()->json(['message' => 'Jabatan berhasil dihapus'], 200);

        } catch (\Exception $e) {
            Log::error("Error saat menghapus jabatan: " . $e->getMessage());
            return response()->json(['message' => 'Terjadi kesalahan saat menghapus jabatan', 'error' => $e->getMessage()], 500);
        }
    }
}