<?php

namespace App\Http\Controllers;

use App\Models\Kontak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KontakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kontak = Kontak::all();
        return response()->json($kontak);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kontak $kontak)
    {
        $request->validate([
            'kontak_alamat' => 'required|string',
            'kontak_telepon' => 'required|string',
            'kontak_email' => 'required|string',
            'kontak_maps' => 'required|string',
        ]);

        $kontak->update([
            'kontak_alamat' => $request->input('kontak_alamat'),
            'kontak_telepon' => $request->input('kontak_telepon'),
            'kontak_email' => $request->input('kontak_email'),
            'kontak_maps' => $request->input('kontak_maps'),
        ]);

        return response()->json($kontak);
    }
}
