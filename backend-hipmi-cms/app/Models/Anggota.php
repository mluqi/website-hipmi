<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anggota extends Model
{
    use HasFactory;

    protected $table = 'anggotas';

    public $timestamps = false;

    protected $fillable = [
        'anggota_nama',
        'anggota_email',
        'anggota_telepon',
        'anggota_jabatan',
        'anggota_bidang',
        'anggota_perusahaan',
        'anggota_perusahaan_logo',
        'anggota_perusahaan_alamat',
        'anggota_perusahaan_website',
        'anggota_pengalaman',
        'anggota_foto',
        'anggota_instagram',
        'anggota_facebook',
        'anggota_linkedin',
        'anggota_tiktok',
    ];

    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class, 'anggota_jabatan');
    }

    public function bidang()
    {
        return $this->belongsTo(Bidang::class, 'anggota_bidang');
    }
}
