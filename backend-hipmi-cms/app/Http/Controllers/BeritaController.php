<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class BeritaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $berita = Berita::all();
        return response()->json($berita);
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
            'tanggal' => 'required|date'
        ]);

        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('berita', 'public');
        } else {
            $fotoPath = null;
        }

        $berita = Berita::create([
            'berita_judul' => $request->judul,
            'berita_isi' => $request->isi,
            'berita_foto' => $fotoPath,
            'berita_kategori' => $request->kategori,
            'berita_tanggal' => $request->tanggal
        ]);

        return response()->json($berita, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $berita = Berita::find($id);
        if (!$berita) {
            return response()->json(['message' => 'Berita not found'], 404);
        }
        return response()->json($berita);
    }

    /**
     * Update the specified resource in storage.
     */
public function update(Request $request, $id)
{
    $berita = Berita::find($id);
    if (!$berita) {
        return response()->json(['message' => 'Berita not found'], 404);
    }

    $request->validate([
        'judul' => 'required|string',
        'isi' => 'required|string',
        'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'kategori' => 'required|string',
        'tanggal' => 'required|date'
    ]);

    $fotoPath = $berita->berita_foto;

    if ($request->hasFile('foto')) {
        if ($berita->berita_foto) {
            Storage::disk('public')->delete($berita->berita_foto);
        }
        $fotoPath = $request->file('foto')->store('berita', 'public');
    }

    $berita->update([
        'berita_judul' => $request->judul,
        'berita_isi' => $request->isi,
        'berita_foto' => $fotoPath,
        'berita_kategori' => $request->kategori,
        'berita_tanggal' => $request->tanggal
    ]);

    return response()->json($berita);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $berita = Berita::find($id);
            
            if (!$berita) {
                Log::warning("Berita with ID {$id} not found");
                return response()->json(['message' => 'Berita not found'], 404);
            }
            
            if ($berita->berita_foto) {
                if (Storage::disk('public')->exists($berita->berita_foto)) {
                    Storage::disk('public')->delete($berita->berita_foto);
                    Log::info("Photo deleted: {$berita->berita_foto}");
                } else {
                    Log::warning("Photo file not found: {$berita->berita_foto}");
                }
            }
            
            $deleted = $berita->delete();
            
            if ($deleted) {
                Log::info("Berita with ID {$id} successfully deleted");
                return response()->json([
                    'message' => 'Berita deleted successfully',
                    'deleted_id' => $id
                ], 200);
            } else {
                Log::error("Failed to delete berita with ID {$id}");
                return response()->json(['message' => 'Failed to delete berita'], 500);
            }
            
        } catch (\Exception $e) {
            Log::error("Error deleting berita: " . $e->getMessage());
            return response()->json([
                'message' => 'Error occurred while deleting berita',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}