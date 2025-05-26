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
            'alamat' => 'required|string',
            'telepon' => 'required|string',
            'email' => 'required|string',
            'maps' => 'required|string',
        ]);

        $kontak->update([
            'kontak_alamat' => $request->input('alamat'),
            'kontak_telepon' => $request->input('telepon'),
            'kontak_email' => $request->input('email'),
            'kontak_maps' => $request->input('maps'),
        ]);

        return response()->json($kontak);
    }
}
