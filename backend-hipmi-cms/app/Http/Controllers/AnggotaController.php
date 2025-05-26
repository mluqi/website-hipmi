<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Models\Anggota;
use Illuminate\Http\Request;

class AnggotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $anggota = Anggota::all();
        return response()->json($anggota, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string',
            'email' => 'required|email',
            'telepon' => 'required|string',
            'jabatan' => 'required|string',
            'bidang' => 'required|string',
            'perusahaan' => 'required|string',
            'perusahaan_alamat' => 'required|string',
            'perusahaan_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'perusahaan_website' => 'nullable|url',
            'pengalaman' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'instagram' => 'nullable|url',
            'facebook' => 'nullable|url',
            'linkedin' => 'nullable|url',
            'tiktok' => 'nullable|url',
        ]);

        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('anggota', 'public');
        } else {
            $fotoPath = null;
        }

        if ($request->hasFile('perusahaan_logo')) {
            $fotoPathPerusahaanLogo = $request->file('perusahaan_logo')->store('anggota', 'public');
        } else {
            $fotoPathPerusahaanLogo = null;
        }

        $anggota = Anggota::create([
            'anggota_nama' => $request->input('nama'),
            'anggota_email' => $request->input('email'),
            'anggota_telepon' => $request->input('telepon'),
            'anggota_jabatan' => $request->input('jabatan'),
            'anggota_bidang' => $request->input('bidang'),
            'anggota_perusahaan' => $request->input('perusahaan'),
            'anggota_perusahaan_alamat' => $request->input('perusahaan_alamat'),
            'anggota_perusahaan_logo' => $fotoPathPerusahaanLogo,
            'anggota_perusahaan_website' => $request->input('perusahaan_website'),
            'anggota_pengalaman' => $request->input('pengalaman'),
            'anggota_foto' => $fotoPath,
            'anggota_instagram' => $request->input('instagram'),
            'anggota_facebook' => $request->input('facebook'),
            'anggota_linkedin' => $request->input('linkedin'),
            'anggota_tiktok' => $request->input('tiktok'),
        ]);

        return response()->json($anggota, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $anggota = Anggota::find($id);
        if (!$anggota) {
            return response()->json(['message' => 'Anggota not found'], 404);
        }
        return response()->json($anggota);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string',
            'email' => 'required|email',
            'telepon' => 'required|string',
            'jabatan' => 'required|string',
            'bidang' => 'required|string',
            'perusahaan' => 'required|string',
            'perusahaan_alamat' => 'required|string',
            'perusahaan_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'perusahaan_website' => 'nullable|url',
            'pengalaman' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'instagram' => 'nullable|url',
            'facebook' => 'nullable|url',
            'linkedin' => 'nullable|url',
            'tiktok' => 'nullable|url',
        ]);

        $anggota = Anggota::find($id);
        if (!$anggota) {
            return response()->json(['message' => 'Anggota not found'], 404);
        }

        $fotoPath = $anggota->anggota_foto;

        if ($request->hasFile('foto')) {
            if ($anggota->anggota_foto) {
                Storage::disk('public')->delete($anggota->anggota_foto);
            }
            $fotoPath = $request->file('foto')->store('anggota', 'public');
        }

        $fotoPathPerusahaanLogo = $anggota->anggota_perusahaan_logo;

        if ($request->hasFile('perusahaan_logo')) {
            if ($anggota->anggota_perusahaan_logo) {
                Storage::disk('public')->delete($anggota->anggota_perusahaan_logo);
            }
            $fotoPathPerusahaanLogo = $request->file('perusahaan_logo')->store('anggota', 'public');
        }
        

        $anggota->update([
            'anggota_nama' => $request->nama,
            'anggota_email' => $request->email,
            'anggota_telepon' => $request->telepon,
            'anggota_jabatan' => $request->jabatan,
            'anggota_bidang' => $request->bidang,
            'anggota_perusahaan' => $request->perusahaan,
            'anggota_perusahaan_alamat' => $request->perusahaan_alamat,
            'anggota_perusahaan_logo' => $fotoPathPerusahaanLogo,
            'anggota_perusahaan_website' => $request->perusahaan_website,
            'anggota_pengalaman' => $request->pengalaman,
            'anggota_foto' => $fotoPath,
            'anggota_instagram' => $request->instagram,
            'anggota_facebook' => $request->facebook,
            'anggota_linkedin' => $request->linkedin,
            'anggota_tiktok' => $request->tiktok,
        ]);

        return response()->json($anggota);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $anggota = Anggota::find($id);
        if (!$anggota) {
            return response()->json(['message' => 'Anggota not found'], 404);
        }

        // Delete associated files from storage
        if ($anggota->anggota_foto) {
            if (Storage::disk('public')->exists($anggota->anggota_foto)) {
                Storage::disk('public')->delete($anggota->anggota_foto);
            }
        }

        if ($anggota->anggota_perusahaan_logo) {
            if (Storage::disk('public')->exists($anggota->anggota_perusahaan_logo)) {
                Storage::disk('public')->delete($anggota->anggota_perusahaan_logo);
            }
        }

        $anggota->delete();
        return response()->json([
            'message' => 'Anggota deleted successfully',
            'deleted_id' => $id
        ], 200);
    }
}
