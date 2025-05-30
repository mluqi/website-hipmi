<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AnggotaController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\JabatanController;
use App\Http\Controllers\BidangController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\SejarahController;
use App\Http\Controllers\KontakController;
use App\Http\Controllers\LandingPageComponentController;
use App\Http\Controllers\EditorImageUploadController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\PesanController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// === PUBLIC ROUTES ===
Route::prefix('public')->group(function () {
    // Anggota
    Route::get('/anggota', [PublicController::class, 'getAllAnggota']);
    Route::get('/anggota/{id}', [PublicController::class, 'getAnggotaById']);

    // Berita
    Route::get('/berita', [PublicController::class, 'getAllBerita']);
    Route::get('/berita/{id}', [PublicController::class, 'getBeritaById']);

    // Kegiatan
    Route::get('/kegiatan', [PublicController::class, 'getAllKegiatan']);
    Route::get('/kegiatan/{id}', [PublicController::class, 'getKegiatanById']);

    // Bidang
    Route::get('/bidang', [PublicController::class, 'getAllBidang']);
    Route::get('/bidang/{id}', [PublicController::class, 'getBidangById']);

    // Jabatan
    Route::get('/jabatan', [PublicController::class, 'getAllJabatan']);
    Route::get('/jabatan/{id}', [PublicController::class, 'getJabatanById']);

    // Kategori
    Route::get('/kategori', [PublicController::class, 'getAllKategori']);
    Route::get('/kategori/{id}', [PublicController::class, 'getKategoriById']);

    // Sejarah
    Route::get('/sejarah', [PublicController::class, 'getSejarahContent']);

    // Landing Page Components
    Route::get('/data-landing-page', [LandingPageComponentController::class, 'index']);

    //kontak
    Route::get('/kontak', [PublicController::class, 'getKontakContent']);
    
    //pesan
    Route::post('/pesan', [PublicController::class, 'addPesan']);
});

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('anggota', AnggotaController::class);
    Route::apiResource('berita', BeritaController::class);
    Route::apiResource('kegiatan', KegiatanController::class);
    Route::apiResource('jabatan', JabatanController::class);
    Route::apiResource('bidang', BidangController::class);
    Route::apiResource('sejarah', SejarahController::class);
    Route::apiResource('content', LandingPageComponentController::class);
    Route::apiResource('kontak', KontakController::class);
    Route::apiResource('kategori', KategoriController::class);
    Route::post('/user/change-password', [AuthController::class, 'updatePassword']);
    Route::post('/upload-image-editor', [EditorImageUploadController::class, 'upload'])->name('editor.image.upload');

    // pesan
    Route::get('/pesan', [PesanController::class, 'index']);
    Route::get('/pesan/{id}', [PesanController::class, 'show']);
    Route::put('/pesan/{id}/change-status', [PesanController::class, 'changePesanStatus']);
    Route::delete('/pesan/{id}', [PesanController::class, 'destroy']);
});
