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
        Schema::create('anggotas', function (Blueprint $table) {
            $table->id();
            $table->string('anggota_nama');
            $table->string('anggota_email');
            $table->string('anggota_telepon');
            $table->unsignedBigInteger('anggota_jabatan'); 
            $table->unsignedBigInteger('anggota_bidang'); 
            $table->string('anggota_perusahaan');
            $table->string('anggota_perusahaan_logo')->nullable();
            $table->string('anggota_perusahaan_alamat')->nullable();
            $table->string('anggota_perusahaan_website')->nullable();
            $table->string('anggota_foto')->nullable();
            $table->string('anggota_instagram')->nullable();
            $table->string('anggota_facebook')->nullable();
            $table->string('anggota_linkedin')->nullable();
            $table->string('anggota_tiktok')->nullable();
            $table->timestamps();
            $table->foreign('anggota_jabatan')->references('id')->on('jabatans')->onDelete('cascade');
            $table->foreign('anggota_bidang')->references('id')->on('bidangs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anggotas');
    }
};
