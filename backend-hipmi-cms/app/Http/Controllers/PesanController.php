<?php

namespace App\Http\Controllers;

use App\Models\Pesan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PesanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $query = Pesan::query();

            // Correctly handle pesan_status filter
            if ($request->has('status') && $request->input('status') != 'semua') {
                $statusFilter = $request->input('status');
                if ($statusFilter == 'pending') {
                    $query->where('pesan_status', 'pending');
                } elseif ($statusFilter == 'read') {
                    $query->where('pesan_status', 'read');
                } elseif ($statusFilter == 'replied') {
                    $query->where('pesan_status', 'replied');
                }
            }
            
            // Search functionality
            if ($request->has('search') && $request->input('search') != '') {
                $searchTerm = $request->input('search');
                $query->where(function($q) use ($searchTerm) {
                    $q->where('pesan_nama', 'LIKE', '%' . $searchTerm . '%')
                      ->orWhere('pesan_email', 'LIKE', '%' . $searchTerm . '%')
                      ->orWhere('pesan_subjek', 'LIKE', '%' . $searchTerm . '%');
                });
            }

            $query->orderBy('created_at', 'desc');
            $perPage = $request->input('per_page', 10);
            $pesan = $query->paginate($perPage);
            
            return response()->json($pesan);
        } catch (\Exception $e) {
            Log::error("Error fetching messages: " . $e->getMessage());
            return response()->json(['message' => 'Gagal mengambil daftar pesan', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $pesan = Pesan::find($id);
            if (!$pesan) {
                return response()->json(['message' => 'Pesan tidak ditemukan'], 404);
            }

            // Mark as read when shown
            if (!$pesan->pesan_status || $pesan->pesan_status == 'pending') {
                $pesan->pesan_status = 'read';
                $pesan->save();
            }
            
            return response()->json($pesan);
        } catch (\Exception $e) {
            Log::error("Error fetching message {$id}: " . $e->getMessage());
            return response()->json(['message' => 'Gagal mengambil detail pesan', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Mark the specified resource as read or unread.
     */
    public function changePesanStatus(Request $request, $id)
    {
        try {
            $pesan = Pesan::find($id);
            if (!$pesan) {
                return response()->json(['message' => 'Pesan tidak ditemukan'], 404);
            }

            $request->validate(['pesan_status' => 'required|string|in:pending,read,replied']);
            
            $pesan->pesan_status = $request->pesan_status;
            $pesan->save();
            
            return response()->json($pesan);
        } catch (\Exception $e) {
            Log::error("Error updating read status for message {$id}: " . $e->getMessage());
            return response()->json(['message' => 'Gagal memperbarui status pesan', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $pesan = Pesan::find($id);
            
            if (!$pesan) {
                Log::warning("Pesan dengan ID {$id} tidak ditemukan untuk dihapus");
                return response()->json(['message' => 'Pesan tidak ditemukan'], 404);
            }
            
            $deleted = $pesan->delete();
            
            if ($deleted) {
                Log::info("Pesan dengan ID {$id} berhasil dihapus");
                return response()->json([
                    'message' => 'Pesan berhasil dihapus',
                    'deleted_id' => $id
                ], 200);
            } else {
                Log::error("Gagal menghapus pesan dengan ID {$id}");
                return response()->json(['message' => 'Gagal menghapus pesan'], 500);
            }
            
        } catch (\Exception $e) {
            Log::error("Error saat menghapus pesan: " . $e->getMessage());
            return response()->json([
                'message' => 'Terjadi kesalahan saat menghapus pesan',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
