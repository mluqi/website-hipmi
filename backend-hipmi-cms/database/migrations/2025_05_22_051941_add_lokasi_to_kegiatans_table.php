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
        Schema::table('kegiatans', function (Blueprint $table) {
            // Tambahkan kolom kegiatan_lokasi setelah kolom kegiatan_waktu
            // Anda bisa menyesuaikan ->after() jika ingin posisi kolomnya berbeda
            $table->string('kegiatan_lokasi')->nullable()->after('kegiatan_waktu');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kegiatans', function (Blueprint $table) {
            $table->dropColumn('kegiatan_lokasi');
        });
    }
};