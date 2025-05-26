<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    use HasFactory;

    protected $table = 'kegiatans';

    public $timestamps = false;

    protected $fillable = [
        'kegiatan_judul',
        'kegiatan_isi',
        'kegiatan_kategori',
        'kegiatan_foto',
        'kegiatan_tanggal',
        'kegiatan_waktu',
        'kegiatan_lokasi'
    ];
}
