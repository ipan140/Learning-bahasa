# Belajar Bahasa - Platform Belajar Aksara Dunia & Katalog 250 Negara

Aplikasi web modern, ringan, dan interaktif untuk mempelajari sistem penulisan dan aksara bahasa asing di dunia (Jepang, Korea, Arab, Jerman, Rusia, Yunani, dan lainnya). Dilengkapi dengan pengucapan audio suara Google, koleksi frasa esensial sehari-hari, katalog 250 negara & kuis trivia dunia, pembuat tabel kustom, serta integrasi cloud untuk sinkronisasi data antar perangkat.

Dibangun dengan **Astro 7 (Static Output)**, **Tailwind CSS 4**, dan **Supabase**.

**Live Demo**: [https://learning-bahasa-news.vercel.app](https://learning-bahasa-news.vercel.app)

---

## ✨ Fitur Utama

### 1. Studio Belajar Aksara Interaktif (`/belajar`)
- **3 Mode Studio Belajar Terpadu**:
  - 📑 **Mode Tabel Aksara**: Grid fonetik interaktif dengan audio lafal asli, pelacak progres hafalan huruf (`0 / 46 Huruf`), tombol **▶ Putar Urut** untuk mendengarkan seluruh aksara secara berurutan dengan highlight visual sel, tombol langsung edit/hapus karakter & edit judul tabel di header kartu, penanda karakter kembar (`DOBEL`) & pembersih otomatis 1-klik (`🧹 Hapus Huruf Dobel Otomatis`).
  - 🎴 **Mode Flashcard & Kuis Dua Arah**: Latihan kartu bolak-balik interaktif serta Kuis Pilihan Ganda 4 opsi dengan pilihan arah belajar: **Aksara → Bacaan** atau **Bacaan → Aksara** dan pelacak skor otomatis.
  - 💬 **Mode Frasa Dasar Sehari-hari**: Koleksi percakapan dasar (salam, angka, belanja, darurat) dengan bilah pencarian frasa cepat, filter chip kategori, tombol audio native, kontrol kecepatan 6 level (`0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x`), fitur CRUD lengkap (tambah/edit/hapus frasa & kategori kustom), dan impor spreadsheet/CSV/teks instan via SheetJS.
- **Audio Suara Native Google**: Klik setiap kotak huruf atau frasa untuk mendengarkan lafal fonetik alami menggunakan Web Speech Synthesis API dan Google Speech TTS fallback.
- **Kontrol Kecepatan Suara Presisi**: Pengaturan kecepatan audio 6 tingkat (`0.5x`, `0.75x`, `1.0x` default, `1.25x`, `1.5x`, `2.0x`) serta toggle On/Off audio.
- **Pembuat Tabel Aksara Mandiri (+ Buat Tabel)**: Buat dan simpan materi belajar aksara buatan Anda sendiri langsung di browser, atau impor baris data dari file CSV / Excel.
- **Tampilan 100% Responsif Mobile & Desktop**: Grid rapi di layar ponsel kecil (375px) tanpa scroll horizontal halaman dan multi-kolom di tablet/desktop.

### 2. Katalog 250 Negara & Target Belajar (`/katalog`)
- **Katalog 250 Negara Lengkap**: Data resmi nama negara, bendera, ibukota, bahasa resmi, dan pembagian kawasan regional benua.
- **Tandai Target Belajar (Bookmark)**: Simpan negara tujuan yang ingin Anda pelajari bahasanya.
- **Catatan Target Belajar Pribadi**: Tambahkan motivasi, catatan khusus, atau target hafalan per negara yang tersinkron otomatis ke cloud.
- **🎮 Game Kuis Trivia 250 Negara**: Kuis seru menebak bahasa resmi & ibukota negara dunia dengan pelacak streak dan skor tertinggi.
- **Filter Kawasan**: Navigasi instan berdasarkan kawasan (Asia & Oseania, Eropa, Timur Tengah, Afrika, Amerika) serta tab khusus **⭐ Target Saya**.
- **Ekspor & Impor Cadangan**: Unduh target belajar Anda sebagai file JSON cadangan atau pulihkan ke perangkat lain kapan saja.

### 3. Pencarian Cepat Global (Command Palette - `Ctrl + K`)
- Tekan `Ctrl + K` (atau klik tombol pencarian di navbar) untuk membuka Command Palette cepat: cari aksara, lompat ke mode belajar, akses 250 negara dunia, atau buat tabel baru secara instan.

### 4. Integrasi Cloud & Keamanan Akun Pengguna (Supabase)
- **Modal Akun Bebas Reload (`AuthModal.astro`)**: Dialog modal login dan registrasi modern tanpa pengalihan halaman, dilengkapi tombol intip/sembunyikan kata sandi (👁️).
- **Proteksi Keamanan & Rate Limit Login**: Sistem proteksi anti-spam / brute-force cerdas (jeda keamanan otomatis 30 detik setelah 5x gagal, hitung mundur real-time `⏳ Tunggu ... detik`, serta penanganan ramah batas laju permintaan server Supabase).
- **4 Statistik Dinamis Akun**: Menampilkan ringkasan progres real-time (`Target Negara`, `Tabel Kustom`, `Huruf Hafal`, `Koleksi Frasa`) serta lencana keaktifan harian (`🔥 Aktif Belajar`).
- **Sinkronisasi Data Otomatis**: Target negara, tabel kustom, progres hafalan aksara, skor kuis, frasa kustom, dan preferensi pengguna otomatis tersimpan di Supabase.
- **Bekerja Penuh Tanpa Login (Offline-Ready)**: Seluruh fitur tetap dapat digunakan 100% tanpa login menggunakan penyimpanan `localStorage` browser.

### 5. Tipografi & Desain Retro-Tech
- **100% Static HTML**: Kecepatan render instan di semua perangkat dan hemat kuota data.
- **Tema Gelap & Terang (Dark / Light)**: Sakelar tema instan dengan sinkronisasi preferensi sistem OS.
- **Desain Monospace Presisi**: Menggunakan font JetBrains Mono Variable dengan palet warna brand terstandarisasi (`--cta`, `--ok`, `--badge`, dll.).

---

## 🛠️ Tech Stack

- **Framework**: [Astro 7](https://astro.build/) (Static Site Generation)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) dengan CSS Variables Token (`@tailwindcss/vite`)
- **Font**: JetBrains Mono Variable
- **Database & Auth**: [Supabase JS Client](https://supabase.com/) (`@supabase/supabase-js`)
- **Excel & Spreadsheet Parser**: [SheetJS (xlsx)](https://sheetjs.com/)
- **Efek Partikel**: Canvas Confetti
- **Audio Engine**: Web Speech Synthesis API & Google Translate TTS Audio Fallback
- **Deployment**: Vercel / Netlify / Cloudflare Pages

---

## 🚀 Panduan Memulai Cepat (Local Development)

### 1. Prasyarat
Pastikan Anda sudah menginstal **Node.js** versi 20.x atau 22.x.

### 2. Instalasi Dependensi
```bash
git clone https://github.com/username/Learning-bahasa.git
cd Learning-bahasa
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Buka file `.env` dan masukkan kredensial Supabase Anda:
```env
PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```
> **Catatan**: Kredensial di atas bisa didapatkan gratis di dashboard [Supabase](https://supabase.com) pada menu **Project Settings -> API**. Jika dikosongkan, aplikasi otomatis beralih ke mode penyimpanan lokal (`localStorage`).

### 4. Jalankan Server Development
```bash
npm run dev
```
Buka browser Anda dan akses alamat `http://localhost:4321`.

---

## 🗄️ Skema Database Supabase

Seluruh skrip SQL siap pakai tersedia lengkap di file [`supabase-schema.sql`](supabase-schema.sql). Skema mencakup:

1. **`user_targets`**: Menyimpan daftar kode negara target belajar dan catatan pribadi per pengguna.
2. **`user_custom_tables`**: Menyimpan tabel aksara kustom buatan pengguna.
3. **`user_study_progress`**: Menyimpan status hafalan karakter aksara dan rekor skor kuis pilihan ganda.
4. **`user_custom_phrases`**: Menyimpan koleksi frasa kustom hasil input manual maupun impor file Excel.
5. **`user_phrase_categories`**: Menyimpan kategori frasa kustom pengguna.
6. **`user_preferences`**: Menyimpan pengaturan kecepatan audio, status suara, dan preferensi tema gelap/terang.

Seluruh tabel dilengkapi dengan fitur **Row Level Security (RLS)** dan indeks performa untuk memastikan keamanan dan kecepatan akses data.

---

## 📦 Build & Deploy ke Vercel

### 1. Verifikasi Build Lokal
```bash
npm run build
```
Seluruh file statis akan diproduksi ke dalam folder `dist/`.

### 2. Deploy ke Vercel
1. Hubungkan repository GitHub Anda ke [Vercel](https://vercel.com).
2. Konfigurasi pengaturan proyek:
   - **Framework Preset**: `Astro`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Masukkan **Environment Variables** di Vercel Dashboard (**Settings -> Environment Variables**):
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`
4. Klik **Deploy**.

---

## 📁 Struktur Direktori

```text
Learning-bahasa/
├── public/                 # Asset statis publik (manifest.json, favicon, og image)
├── src/
│   ├── components/         # Komponen UI Astro
│   │   ├── AuthModal.astro         # Modal Login/Register, 4 Statistik & Profil
│   │   ├── CommandPalette.astro    # Pencarian Cepat Global (Ctrl + K)
│   │   ├── Footer.astro            # Footer navigasi kawasan & aksara
│   │   ├── GuideWindow.astro       # Panduan interaktif simulasi langkah
│   │   ├── Header.astro            # Navigasi atas, pencarian & tombol tema
│   │   ├── MediaWindow.astro       # Wrapper jendela display
│   │   ├── Section.astro           # Komponen layout band/section
│   │   └── ThemeSwitcher.astro     # Tombol Dark/Light mode
│   ├── data/               # Data statis terstruktur
│   │   ├── all-countries.json      # Katalog lengkap 250 negara
│   │   ├── countries.ts            # Tipe dan helper filter negara
│   │   ├── languages.ts            # Data huruf aksara bawaan (Jepang, Arab, dll.)
│   │   ├── phrases.ts              # Data frasa esensial bawaan per bahasa
│   │   ├── site.ts                 # Navigasi & link footer
│   │   └── site-settings.json      # Metadata situs dan konfigurasi
│   ├── layouts/
│   │   └── Base.astro              # Layout induk HTML, metadata SEO & Open Graph
│   ├── lib/
│   │   └── supabase.ts             # Client Supabase & fungsi sinkronisasi cloud
│   ├── pages/              # Routing halaman statis
│   │   ├── 404.astro               # Halaman error 404
│   │   ├── belajar.astro           # Studio Belajar Aksara, Flashcard & Frasa
│   │   ├── index.astro             # Halaman utama (Beranda)
│   │   ├── katalog.astro           # Halaman Katalog 250 Negara & Kuis Trivia
│   │   └── llms.txt.ts             # Endpoint panduan konteks LLM
│   └── styles/
│       └── global.css              # Variabel tema Tailwind CSS 4 & styling
├── astro.config.mjs        # Konfigurasi Astro
├── package.json            # Daftar dependensi & script NPM
├── supabase-schema.sql     # Skema database Supabase lengkap & RLS
└── README.md               # Dokumentasi proyek
```
