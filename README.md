# Belajar Bahasa - Platform Belajar Aksara Dunia & Database 250 Negara

Aplikasi web modern, ringan, dan interaktif untuk mempelajari sistem penulisan dan aksara bahasa asing di dunia (Jepang, Korea, Arab, Jerman, Rusia, Yunani, dan lainnya). Dilengkapi dengan pengucapan audio suara Google, database 250 negara & bahasa resmi dunia, pembuat tabel kustom, serta integrasi cloud untuk sinkronisasi data antar perangkat.

Dibangun dengan **Astro 7 (Static Output)**, **Tailwind CSS 4**, dan **Supabase**.

**Live Demo**: [https://learning-bahasa-news.vercel.app](https://learning-bahasa-news.vercel.app)

---

## ✨ Fitur Utama

### 1. Studio Belajar Aksara Interaktif (`/belajar`)
- **Tabel Aksara Lengkap**: Belajar karakter Hiragana & Katakana (Jepang), Hangul (Korea), Hijaiyah (Arab), Cyrillic (Rusia), Alfabet Yunani, hingga huruf beraksen/Umlaut Jerman.
- **Audio Suara Google**: Klik setiap kartu aksara untuk mendengarkan lafal fonetik alami secara langsung menggunakan Google Speech Synthesis API dan Google TTS fallback.
- **Tampilan Responsif Mobile & Desktop**: Grid 2-kolom teratur di layar ponsel kecil (375px) dan multi-kolom di tablet/desktop tanpa scroll horizontal.
- **Filter Kategori Cepat**: Navigasi per baris atau bunyi huruf (Vokal Dasar, Bunyi K, Bunyi S, dsb.).
- **Pembuat Tabel Aksara Mandiri (+ Buat Tabel)**: Buat dan simpan materi belajar buatan Anda sendiri langsung di browser, atau impor tabel dari file CSV / Excel.

### 2. Katalog Database 250 Negara (`/katalog`)
- **Database 250 Negara Lengkap**: Data resmi nama negara, bendera, ibukota, bahasa resmi, dan pembagian kawasan regional benua.
- **Tandai Target Belajar (Bookmark)**: Simpan negara tujuan yang ingin Anda pelajari bahasanya.
- **Filter Kawasan**: Navigasi instan berdasarkan regional (Asia & Oseania, Eropa, Timur Tengah, Afrika, Amerika) serta tab khusus **Target Belajar Saya**.
- **Ekspor & Impor Cadangan**: Unduh target belajar Anda sebagai file JSON cadangan atau impor ke perangkat lain kapan saja.

### 3. Integrasi Cloud & Akun Pengguna (Supabase)
- **Login Gratis Berbasis Modal**: Dialog modal pop-up yang rapi dan aman tanpa pengalihan halaman yang membingungkan.
- **Kustomisasi Profil Pengguna**: Pilih avatar foto profil atau unggah foto sendiri, serta ganti nama tampilan pengguna.
- **Sinkronisasi Otomatis**: Daftar target negara dan tabel kustom Anda tersimpan aman di cloud dan langsung tersinkronisasi saat login di perangkat lain.
- **Bekerja Offline / Tanpa Login**: Website tetap dapat digunakan 100% secara lokal menggunakan penyimpanan `localStorage` browser.

### 4. Performa Tinggi & Tipografi Bersih
- **100% Static HTML**: Waktu muat ultra cepat di semua perangkat dan hemat kuota data.
- **Tema Gelap & Terang (Dark / Light Switcher)**: Toggle tema instan di bilah navigasi dengan dukungan preferensi sistem OS.
- **Desain Monospace Presisi**: Menggunakan font JetBrains Mono dengan rasio kontras tinggi dan layout bergaya terminal modern.

---

## 🛠️ Tech Stack

- **Framework**: [Astro 7](https://astro.build/) (Static Site Generation)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) dengan arsitektur CSS Token (`@tailwindcss/vite`)
- **Font**: JetBrains Mono Variable
- **Database & Auth**: [Supabase JS Client](https://supabase.com/) (`@supabase/supabase-js`)
- **Audio Engine**: Web Speech Synthesis API & Google TTS Audio Engine
- **Deployment**: Vercel / Netlify / Cloudflare Pages

---

## 🚀 Panduan Memulai Cepat (Local Development)

### 1. Prasyarat
Pastikan Anda sudah menginstal **Node.js** versi 22.12.0 atau yang lebih baru.

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
> **Catatan**: Kredensial di atas bisa didapatkan gratis di dashboard [Supabase](https://supabase.com) pada menu **Project Settings -> API**.

### 4. Jalankan Server Development
```bash
npm run dev
```
Buka browser dan akses alamat `http://localhost:4321`.

---

## 🗄️ Skema Database Supabase (Opsional)

Jika Anda menghubungkan Supabase untuk fitur sinkronisasi cloud antar perangkat, jalankan skrip SQL berikut di menu **SQL Editor** pada Dashboard Supabase Anda:

```sql
-- 1. Tabel untuk menyimpan target negara pengguna
CREATE TABLE IF NOT EXISTS public.user_targets (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    targets TEXT[] NOT NULL DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_targets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pengguna dapat melihat target sendiri" 
    ON public.user_targets FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Pengguna dapat mengubah target sendiri" 
    ON public.user_targets FOR ALL 
    USING (auth.uid() = user_id);

-- 2. Tabel untuk menyimpan tabel aksara kustom pengguna
CREATE TABLE IF NOT EXISTS public.user_custom_tables (
    id TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    grid JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id, user_id)
);

ALTER TABLE public.user_custom_tables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pengguna dapat mengelola tabel kustom sendiri" 
    ON public.user_custom_tables FOR ALL 
    USING (auth.uid() = user_id);
```

---

## 📦 Build & Deploy ke Vercel

### 1. Build Lokal
Untuk memverifikasi bahwa seluruh halaman siap diproduksi:
```bash
npm run build
```
Seluruh file statis akan di-*bundle* ke dalam folder `dist/`.

### 2. Deploy ke Vercel
1. Hubungkan repository GitHub Anda ke [Vercel](https://vercel.com).
2. Di bagian pengaturan proyek Vercel:
   - **Framework Preset**: `Astro`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Masukkan **Environment Variables** di Vercel Dashboard (**Settings -> Environment Variables**):
   - `PUBLIC_SUPABASE_URL` = URL proyek Supabase Anda
   - `PUBLIC_SUPABASE_ANON_KEY` = Anon Public Key Supabase Anda
4. Klik **Deploy** (atau trigger *Redeploy* jika baru saja menambahkan variabel environment).

---

## 📁 Struktur Direktori

```text
Learning-bahasa/
├── public/                 # Asset statis publik (favicon, robots.txt, og image)
├── src/
│   ├── components/         # Komponen UI Astro
│   │   ├── AuthModal.astro         # Modal Login/Register & Edit Profil
│   │   ├── Footer.astro            # Footer navigasi kawasan & aksara
│   │   ├── GuideWindow.astro       # Panduan interaktif simulasi langkah
│   │   ├── Header.astro            # Navigasi atas & tombol tema
│   │   ├── MediaWindow.astro       # Wrapper jendela display
│   │   ├── Section.astro           # Komponen layout band/section
│   │   └── ThemeSwitcher.astro     # Tombol Dark/Light mode
│   ├── data/               # Data statis terstruktur
│   │   ├── all-countries.json      # Database lengkap 250 negara
│   │   ├── countries.ts            # Tipe dan filter data negara
│   │   ├── languages.ts            # Database huruf aksara (Jepang, Arab, dll.)
│   │   ├── site.ts                 # Navigasi & link footer
│   │   └── site-settings.json      # Metadata situs dan konfigurasi
│   ├── layouts/
│   │   └── Base.astro              # Layout induk HTML, metadata SEO & Open Graph
│   ├── lib/
│   │   └── supabase.ts             # Inisialisasi Supabase client & fungsi helper
│   ├── pages/              # Routing halaman statis
│   │   ├── 404.astro               # Halaman error 404
│   │   ├── belajar.astro           # Studio belajar aksara & pembuat tabel
│   │   ├── index.astro             # Halaman utama (Beranda)
│   │   ├── katalog.astro           # Halaman katalog 250 negara
│   │   └── llms.txt.ts             # Endpoint panduan konteks LLM
│   └── styles/
│       └── global.css              # Variabel tema Tailwind CSS 4 & styling
├── astro.config.mjs        # Konfigurasi Astro
├── package.json            # Daftar dependensi & script NPM
└── README.md               # Dokumentasi proyek
```

---

## 📄 Lisensi

Proyek ini berlisensi [MIT](LICENSE.md). Bebas digunakan dan dikembangkan untuk keperluan belajar mandiri maupun riset pendidikan.
