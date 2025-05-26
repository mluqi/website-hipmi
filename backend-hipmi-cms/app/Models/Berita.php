<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    protected $table = 'beritas';

    public $timestamps = false;

    protected $fillable = [
        'berita_judul',
        'berita_isi',
        'berita_foto',
        'berita_kategori',
        'berita_tanggal',
    ];
}
