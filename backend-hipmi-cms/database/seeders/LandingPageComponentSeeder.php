<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LandingPageComponent; // Pastikan model diimpor
use Illuminate\Support\Facades\DB;

class LandingPageComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kosongkan tabel terlebih dahulu untuk menghindari duplikasi jika seeder dijalankan ulang
        LandingPageComponent::truncate(); // Atau DB::table('landing_page_components')->truncate();

        $components = [
            // Hero Section
            [
                'section' => 'hero',
                'key_name' => 'image_1',
                'value' => null, // Path gambar akan null sesuai permintaan
                'type' => 'image',
                'sort_order' => 1,
            ],
            [
                'section' => 'hero',
                'key_name' => 'image_2',
                'value' => null,
                'type' => 'image',
                'sort_order' => 2,
            ],
            [
                'section' => 'hero',
                'key_name' => 'image_3',
                'value' => null,
                'type' => 'image',
                'sort_order' => 3,
            ],
            [
                'section' => 'hero',
                'key_name' => 'text_main',
                'value' => 'Welcome to Our Site',
                'type' => 'text',
                'sort_order' => 4,
            ],

            // About Us Section
            [
                'section' => 'aboutus',
                'key_name' => 'text',
                'value' => 'Kami adalah organisasi yang berdedikasi untuk memajukan pengusaha muda di Kota Cirebon. Dengan berbagai program dan jaringan yang luas, kami berkomitmen untuk menciptakan ekosistem wirausaha yang dinamis dan inovatif.',
                'type' => 'text',
                'sort_order' => 1,
            ],
            [
                'section' => 'aboutus',
                'key_name' => 'image',
                'value' => null,
                'type' => 'image',
                'sort_order' => 2,
            ],

            // Visi Misi Section
            [
                'section' => 'visimisi',
                'key_name' => 'visi',
                'value' => 'Menjadi organisasi pencetak pengusaha muda dan pembentuk ekosistem wirausaha terbaik di Kota Cirebon melalui program kerja yang tepat inovatif dengan semangat dan marwah organisasi HIPMI.',
                'type' => 'text',
                'sort_order' => 1,
            ],
            [
                'section' => 'visimisi',
                'key_name' => 'misi',
                'value' => "1. Bangun koneksi dan kolaborasi dengan semangat inovasi dan optimalisasi.\n2. Pengembangan ilmu dan kompetensi untuk anggota.\n3. Membantu solusi modal dan akses pasar untuk anggota.\n4. Menyebarkan semangat kewirausahaan di Kota Cirebon.",
                'type' => 'text',
                'sort_order' => 2,
            ],

            // Photo Slide Section
            [
                'section' => 'photoslide',
                'key_name' => 'slide_1',
                'value' => null,
                'type' => 'image',
                'sort_order' => 1,
            ],
            [
                'section' => 'photoslide',
                'key_name' => 'slide_2',
                'value' => null,
                'type' => 'image',
                'sort_order' => 2,
            ],
            [
                'section' => 'photoslide',
                'key_name' => 'slide_3',
                'value' => null,
                'type' => 'image',
                'sort_order' => 3,
            ],

            // Anggota Section
            [
                'section' => 'anggota',
                'key_name' => 'description',
                'value' => 'HIPMI Kota Cirebon adalah wadah bagi para pengusaha muda untuk bertumbuh, berkolaborasi, dan berkontribusi. Sebagai anggota, Anda akan mendapatkan akses ke berbagai program pengembangan diri, jaringan bisnis yang luas, serta kesempatan untuk terlibat dalam advokasi kebijakan yang mendukung ekosistem wirausaha.',
                'type' => 'text',
                'sort_order' => 1,
            ],
            [
                'section' => 'anggota',
                'key_name' => 'image',
                'value' => null,
                'type' => 'image',
                'sort_order' => 2,
            ],
        ];

        foreach ($components as $component) {
            LandingPageComponent::create($component);
        }
    }
}
