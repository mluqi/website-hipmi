<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLandingPageComponentsTable extends Migration
{
    public function up(): void
    {
        Schema::create('landing_page_components', function (Blueprint $table) {
            $table->id();
            $table->string('section'); // e.g., 'hero', 'aboutus'
            $table->string('key_name'); // e.g., 'image_1', 'text'
            $table->text('value')->nullable(); // bisa teks atau URL gambar
            $table->enum('type', ['text', 'image'])->default('text');
            $table->integer('sort_order')->default(0); // untuk urutan tampil
            $table->timestamps(); // created_at & updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('landing_page_components');
    }
}

