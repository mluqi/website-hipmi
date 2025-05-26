<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingPageComponent extends Model
{
    protected $fillable = [
        'section',
        'key_name',
        'value',
        'type',
        'sort_order',
    ];
}
