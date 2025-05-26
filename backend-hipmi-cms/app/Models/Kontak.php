<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kontak extends Model
{
    use HasFactory;

    protected $table = 'kontak';

    public $timestamps = false;

    protected $fillable = [
        'kontak_alamat',
        'kontak_telepon',
        'kontak_email',
        'kontak_maps'
    ];
}
