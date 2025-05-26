<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kegiatans', function (Blueprint $table) {
            $table->id();
            $table->string('kegiatan_judul');
            $table->text('kegiatan_isi');
            $table->string('kegiatan_foto')->nullable();
            $table->string('kegiatan_kategori');
            $table->string('kegiatan_tanggal');
            $table->string('kegiatan_waktu');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kegiatans');
    }
};
