-- ==============================================================================
-- SKEMA DATABASE SUPABASE UNTUK BELAJAR BAHASA
-- Buka Dashboard Supabase -> Masuk ke Menu "SQL Editor" -> Buat "New Query" ->
-- Paste seluruh kode ini lalu klik tombol "RUN".
-- ==============================================================================

-- 1. TABEL TARGET NEGARA YANG INGIN DIPELAJARI
create table if not exists public.user_targets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  country_id text not null,
  notes text default '',
  created_at timestamptz default now() not null,
  constraint unique_user_country unique (user_id, country_id)
);

-- Aktifkan keamanan baris (Row Level Security / RLS)
alter table public.user_targets enable row level security;

-- Pengguna hanya bisa membaca target miliknya sendiri
create policy "User can view own targets" 
  on public.user_targets for select 
  using (auth.uid() = user_id);

-- Pengguna hanya bisa menambah target miliknya sendiri
create policy "User can insert own targets" 
  on public.user_targets for insert 
  with check (auth.uid() = user_id);

-- Pengguna hanya bisa mengubah target miliknya sendiri
create policy "User can update own targets" 
  on public.user_targets for update 
  using (auth.uid() = user_id);

-- Pengguna hanya bisa menghapus target miliknya sendiri
create policy "User can delete own targets" 
  on public.user_targets for delete 
  using (auth.uid() = user_id);


-- 2. TABEL AKSARA KUSTOM (YANG DIBUAT SENDIRI ATAU DIIMPORT DARI EXCEL)
create table if not exists public.user_custom_tables (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  script text default '',
  description text default '',
  rows jsonb not null,
  created_at timestamptz default now() not null
);

-- Aktifkan RLS
alter table public.user_custom_tables enable row level security;

-- Pengguna hanya bisa membaca tabel miliknya sendiri
create policy "User can view own custom tables" 
  on public.user_custom_tables for select 
  using (auth.uid() = user_id);

-- Pengguna hanya bisa menambah tabel miliknya sendiri
create policy "User can insert own custom tables" 
  on public.user_custom_tables for insert 
  with check (auth.uid() = user_id);

-- Pengguna hanya bisa mengubah tabel miliknya sendiri
create policy "User can update own custom tables" 
  on public.user_custom_tables for update 
  using (auth.uid() = user_id);

-- Pengguna hanya bisa menghapus tabel miliknya sendiri
create policy "User can delete own custom tables" 
  on public.user_custom_tables for delete 
  using (auth.uid() = user_id);


-- 3. TABEL PROGRES BELAJAR & HAFALAN AKSARA (SINKRONISASI MULTI-PERANGKAT HP & LAPTOP)
create table if not exists public.user_study_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  table_id text not null,                               -- contoh: 'hiragana', 'katakana', 'hangul'
  memorized_chars jsonb default '[]'::jsonb not null,   -- array huruf yang sudah dihafal: ["あ", "い"]
  score int default 0,                                  -- skor kuis latihan
  streak_count int default 1,                           -- hari berturut-turut belajar
  last_practiced_at timestamptz default now() not null, -- waktu terakhir latihan
  metadata jsonb default '{}'::jsonb,                  -- data tambahan fleksibel di masa depan
  constraint unique_user_table_progress unique (user_id, table_id)
);

-- Aktifkan RLS
alter table public.user_study_progress enable row level security;

-- Pengguna hanya bisa membaca progres miliknya sendiri
create policy "User can view own progress" 
  on public.user_study_progress for select 
  using (auth.uid() = user_id);

-- Pengguna hanya bisa menambah progres miliknya sendiri
create policy "User can insert own progress" 
  on public.user_study_progress for insert 
  with check (auth.uid() = user_id);

-- Pengguna hanya bisa mengubah progres miliknya sendiri
create policy "User can update own progress" 
  on public.user_study_progress for update 
  using (auth.uid() = user_id);

-- Pengguna hanya bisa menghapus progres miliknya sendiri
create policy "User can delete own progress" 
  on public.user_study_progress for delete 
  using (auth.uid() = user_id);
