<?php

namespace App\Http\Controllers;

use App\Models\ImageUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EditorImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image_editor' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // Max 5MB, sesuaikan nama field 'image_editor'
        ]);

        if ($request->hasFile('image_editor')) {
            $file = $request->file('image_editor');

            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $sanitizedOriginalName = Str::slug($originalName, '-');
            $extension = $file->getClientOriginalExtension();
            $fileName = 'editor-' . time() . '-' . Str::random(5) . '-' . $sanitizedOriginalName . '.' . $extension;

            $path = 'editor_images'; 

            $filePath = $file->storeAs($path, $fileName, 'public');

            if (!$filePath) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal menyimpan file gambar ke storage.'
                ], 500);
            }

            $imageRecord = ImageUpload::create([
                'filename' => $fileName,
                'path' => $filePath, 
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
            ]);

            return response()->json([
                'success' => true,
                'url' => $imageRecord->url, // Menggunakan accessor getUrlAttribute() dari model ImageUpload
                'id' => $imageRecord->id    // Mengembalikan ID dari record gambar yang baru dibuat
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Tidak ada file gambar yang diunggah atau nama field salah.'
        ], 400);
    }
}
