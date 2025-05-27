<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pesan extends Model
{
    use HasFactory;

    protected $table = 'pesan';

    protected $fillable = [
        'pesan_nama',
        'pesan_email',
        'pesan_subjek',
        'pesan_isi',
        'pesan_status'
    ];

    protected $casts = [
        'pesan_status' => 'string',
    ];
}
