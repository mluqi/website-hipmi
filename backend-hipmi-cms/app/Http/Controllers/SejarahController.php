<?php

namespace App\Http\Controllers;

use App\Models\Sejarah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SejarahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sejarah = Sejarah::all();
        return response()->json($sejarah);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'konten' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $fotoPath = $reques->file('foto')->store('sejarah', 'public');
        } else {
            $fotoPath = null;
        }

        $sejarah = Sejarah::create([
            'sejarah_konten' => $request->input('konten'),
            'sejarah_foto' => $fotoPath,
        ]);

        return response()->json($sejarah, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sejarah $sejarah)
    {
        $request->validate([
            'konten' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $fotoPath = $sejarah->sejarah_foto;

        if ($request->hasFile('foto')) {
            if ($sejarah->sejarah_foto) {
                Storage::disk('public')->delete($sejarah->sejarah_foto);
            }
            $fotoPath = $request->file('foto')->store('sejarah', 'public');
        }

        $sejarah->update([
            'sejarah_konten' => $request->input('konten'),
            'sejarah_foto' => $fotoPath
        ]);

        return response()->json($sejarah);
    }
}
