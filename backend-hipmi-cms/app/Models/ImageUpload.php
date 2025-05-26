<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ImageUpload extends Model
{
    use HasFactory;

    protected $table = 'image_upload';

    protected $fillable = [
        'filename',
        'path',
        'mime_type',
        'size',
    ];

    /**
     * Accessor untuk mendapatkan URL publik gambar.
     */
    public function getUrlAttribute()
    {
        return Storage::disk('public')->url($this->path);
    }
}
