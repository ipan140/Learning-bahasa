import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';

// Cache client instance in memory
let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseConfig(): { url: string; anonKey: string } | null {
  // Hanya membaca dari environment variables (Vercel / .env lokal)
  const envUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const envKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (envUrl && envKey && !envKey.includes('your-anon-key') && envKey.trim().length > 10) {
    return { url: envUrl.trim(), anonKey: envKey.trim() };
  }

  return null;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const config = getSupabaseConfig();
  if (!config) return null;

  try {
    supabaseInstance = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return supabaseInstance;
  } catch (err) {
    console.error('Gagal inisialisasi Supabase client:', err);
    return null;
  }
}

// ================= AUTH HELPERS =================

let cachedUser: User | null = null;
let authListenerRegistered = false;

export async function getCurrentUser(): Promise<User | null> {
  const sb = getSupabase();
  if (!sb) return null;

  // Pasang listener auth state change sekali saja untuk menjaga sinkronisasi memori
  if (!authListenerRegistered && typeof window !== 'undefined') {
    authListenerRegistered = true;
    sb.auth.onAuthStateChange((_event, session) => {
      cachedUser = session?.user ?? null;
    });
  }

  try {
    // 1. Dapatkan session dari storage lokal (cepat & tidak memicu request jaringan berlebih)
    const { data: { session }, error: sessionErr } = await sb.auth.getSession();
    if (sessionErr || !session) {
      cachedUser = null;
      return null;
    }

    if (session.user) {
      cachedUser = session.user;
      return cachedUser;
    }

    return cachedUser;
  } catch (err) {
    console.warn('getCurrentUser warning:', err);
    return cachedUser;
  }
}

export async function signUpWithEmail(email: string, password: string) {
  const sb = getSupabase();
  if (!sb) throw new Error('Layanan akun belum terhubung. Pastikan env telah diset di Vercel dan di-redeploy.');
  const res = await sb.auth.signUp({
    email,
    password,
  });
  if (res.data?.user) {
    cachedUser = res.data.user;
  }
  return res;
}

export async function signInWithEmail(email: string, password: string) {
  const sb = getSupabase();
  if (!sb) throw new Error('Layanan akun belum terhubung. Pastikan env telah diset di Vercel dan di-redeploy.');
  const res = await sb.auth.signInWithPassword({
    email,
    password,
  });
  if (res.data?.user) {
    cachedUser = res.data.user;
  }
  return res;
}

export async function signInWithGoogle() {
  const sb = getSupabase();
  if (!sb) throw new Error('Layanan akun belum terhubung. Pastikan env telah diset di Vercel dan di-redeploy.');
  
  let redirectUrl = 'https://learning-bahasa-news.vercel.app/';
  if (typeof window !== 'undefined' && window.location.origin) {
    redirectUrl = `${window.location.origin}/`;
  }

  return await sb.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
}

export async function signOutUser() {
  const sb = getSupabase();
  cachedUser = null;
  if (!sb) return;
  try {
    return await sb.auth.signOut();
  } catch (err) {
    console.warn('signOutUser warning:', err);
  }
}

export async function resetPasswordForEmail(email: string) {
  const sb = getSupabase();
  if (!sb) throw new Error('Layanan autentikasi belum terhubung.');
  return await sb.auth.resetPasswordForEmail(email, {
    redirectTo: typeof window !== 'undefined' ? `${window.location.origin}` : undefined,
  });
}

export async function updateUserProfile(displayName: string, avatarUrl?: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const updateData: any = { display_name: displayName };
    if (avatarUrl !== undefined) {
      updateData.avatar_url = avatarUrl;
    }
    const { error } = await sb.auth.updateUser({
      data: updateData
    });
    if (error) {
      console.warn('Gagal updateUserProfile:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error updateUserProfile:', err);
    return false;
  }
}

// ================= DATA SYNC HELPERS =================

/** Ambil seluruh target negara user dari Supabase */
export async function fetchUserTargetsFromCloud(userId: string): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from('user_targets')
      .select('country_id')
      .eq('user_id', userId);

    if (error) {
      console.warn('Gagal fetch user_targets:', error);
      return [];
    }
    return (data || []).map((row: any) => row.country_id);
  } catch (err) {
    console.error('Error fetchUserTargetsFromCloud:', err);
    return [];
  }
}

/** Tambah satu target negara ke Supabase */
export async function addTargetToCloud(userId: string, countryId: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from('user_targets')
      .upsert({ user_id: userId, country_id: countryId }, { onConflict: 'user_id, country_id' });
    if (error) {
      console.error('Gagal addTargetToCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error addTargetToCloud:', err);
    return false;
  }
}

/** Hapus satu target negara dari Supabase */
export async function removeTargetFromCloud(userId: string, countryId: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from('user_targets')
      .delete()
      .eq('user_id', userId)
      .eq('country_id', countryId);
    if (error) {
      console.error('Gagal removeTargetFromCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error removeTargetFromCloud:', err);
    return false;
  }
}

/** Sinkronkan seluruh list target lokal ke Supabase (batch upsert) */
export async function batchSyncTargetsToCloud(userId: string, countryIds: string[]): Promise<boolean> {
  const sb = getSupabase();
  if (!sb || countryIds.length === 0) return true;
  try {
    const records = countryIds.map((cid) => ({
      user_id: userId,
      country_id: cid,
    }));
    const { error } = await sb
      .from('user_targets')
      .upsert(records, { onConflict: 'user_id, country_id' });
    if (error) {
      console.error('Gagal batchSyncTargetsToCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error batchSyncTargetsToCloud:', err);
    return false;
  }
}

/** Ambil seluruh tabel kustom buatan user dari Supabase */
export async function fetchUserCustomTablesFromCloud(userId: string): Promise<any[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from('user_custom_tables')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Gagal fetch user_custom_tables:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Error fetchUserCustomTablesFromCloud:', err);
    return [];
  }
}

/** Simpan tabel kustom ke Supabase */
export async function saveCustomTableToCloud(userId: string, table: any): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from('user_custom_tables')
      .upsert({
        id: table.id,
        user_id: userId,
        name: table.name,
        script: table.voiceLang || table.script || '',
        description: table.description || '',
        rows: table.grid || table.rows || [],
      }, { onConflict: 'id' });
    if (error) {
      console.error('Gagal saveCustomTableToCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saveCustomTableToCloud:', err);
    return false;
  }
}

/** Hapus tabel kustom dari Supabase */
export async function deleteCustomTableFromCloud(userId: string, tableId: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from('user_custom_tables')
      .delete()
      .eq('user_id', userId)
      .eq('id', tableId);
    if (error) {
      console.error('Gagal deleteCustomTableFromCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error deleteCustomTableFromCloud:', err);
    return false;
  }
}

// ================= PROGRESS SYNC HELPERS =================

/** Ambil seluruh progres belajar aksara user dari Supabase */
export async function fetchUserProgressFromCloud(userId: string): Promise<Record<string, string[]>> {
  const sb = getSupabase();
  if (!sb) return {};
  try {
    const { data, error } = await sb
      .from('user_study_progress')
      .select('table_id, memorized_chars')
      .eq('user_id', userId);

    if (error) {
      console.warn('Gagal fetch user_study_progress:', error);
      return {};
    }
    const map: Record<string, string[]> = {};
    (data || []).forEach((row: any) => {
      map[row.table_id] = Array.isArray(row.memorized_chars) ? row.memorized_chars : [];
    });
    return map;
  } catch (err) {
    console.error('Error fetchUserProgressFromCloud:', err);
    return {};
  }
}

/** Simpan progres huruf yang dihafal untuk suatu tabel aksara ke Supabase */
export async function saveUserProgressToCloud(
  userId: string,
  tableId: string,
  memorizedChars: string[],
  score: number = 0
): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from('user_study_progress')
      .upsert({
        user_id: userId,
        table_id: tableId,
        memorized_chars: memorizedChars,
        score: score,
        last_practiced_at: new Date().toISOString(),
      }, { onConflict: 'user_id, table_id' });

    if (error) {
      console.error('Gagal saveUserProgressToCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saveUserProgressToCloud:', err);
    return false;
  }
}

/** Ambil target negara beserta catatannya dari Supabase */
export async function fetchUserTargetsWithNotesFromCloud(userId: string): Promise<Record<string, string>> {
  const sb = getSupabase();
  if (!sb) return {};
  try {
    const { data, error } = await sb
      .from('user_targets')
      .select('country_id, notes')
      .eq('user_id', userId);

    if (error) {
      console.warn('Gagal fetch user_targets with notes:', error);
      return {};
    }
    const map: Record<string, string> = {};
    (data || []).forEach((row: any) => {
      map[row.country_id] = row.notes || '';
    });
    return map;
  } catch (err) {
    console.error('Error fetchUserTargetsWithNotesFromCloud:', err);
    return {};
  }
}

/** Simpan catatan pribadi untuk target negara di Supabase */
export async function saveTargetNoteToCloud(userId: string, countryId: string, notes: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from('user_targets')
      .upsert({
        user_id: userId,
        country_id: countryId,
        notes: notes.trim(),
      }, { onConflict: 'user_id, country_id' });

    if (error) {
      console.error('Gagal saveTargetNoteToCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saveTargetNoteToCloud:', err);
    return false;
  }
}


// ================= USER PHRASES SYNC HELPERS =================

/** Ambil seluruh kumpulan frasa kustom pengguna dari Supabase */
export async function fetchUserPhrasesFromCloud(userId: string): Promise<Record<string, any>> {
  const sb = getSupabase();
  if (!sb) return {};
  try {
    const { data, error } = await sb
      .from('user_custom_phrases')
      .select('language_id, categories')
      .eq('user_id', userId);

    if (error) {
      console.warn('Gagal fetch user_custom_phrases:', error);
      return {};
    }
    const map: Record<string, any> = {};
    (data || []).forEach((row: any) => {
      map[row.language_id] = row.categories || [];
    });
    return map;
  } catch (err) {
    console.error('Error fetchUserPhrasesFromCloud:', err);
    return {};
  }
}

/** Simpan kumpulan frasa untuk satu bahasa ke Supabase */
export async function saveUserPhrasesToCloud(userId: string, languageId: string, categories: any[]): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from('user_custom_phrases')
      .upsert({
        id: `phrases-${userId}-${languageId}`,
        user_id: userId,
        language_id: languageId,
        categories: categories,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id, language_id' });

    if (error) {
      console.error('Gagal saveUserPhrasesToCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saveUserPhrasesToCloud:', err);
    return false;
  }
}

/** Hapus frasa kustom untuk satu bahasa di Supabase */
export async function deleteUserPhrasesFromCloud(userId: string, languageId: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from('user_custom_phrases')
      .delete()
      .eq('user_id', userId)
      .eq('language_id', languageId);

    if (error) {
      console.error('Gagal deleteUserPhrasesFromCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error deleteUserPhrasesFromCloud:', err);
    return false;
  }
}


// ================= PHRASE CATEGORIES & PREFERENCES HELPERS =================

/** Ambil daftar kategori frasa kustom buatan pengguna dari Supabase */
export async function fetchUserPhraseCategoriesFromCloud(userId: string): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from('user_phrase_categories')
      .select('name')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('Gagal fetch user_phrase_categories:', error);
      return [];
    }
    return (data || []).map((row: any) => row.name);
  } catch (err) {
    console.error('Error fetchUserPhraseCategoriesFromCloud:', err);
    return [];
  }
}

/** Simpan satu nama kategori frasa baru ke Supabase */
export async function saveUserPhraseCategoryToCloud(userId: string, categoryName: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb || !categoryName.trim()) return false;
  try {
    const { error } = await sb
      .from('user_phrase_categories')
      .upsert({
        user_id: userId,
        name: categoryName.trim(),
      }, { onConflict: 'user_id, name' });

    if (error) {
      console.error('Gagal saveUserPhraseCategoryToCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saveUserPhraseCategoryToCloud:', err);
    return false;
  }
}

/** Hapus kategori frasa kustom dari Supabase */
export async function deleteUserPhraseCategoryFromCloud(userId: string, categoryName: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from('user_phrase_categories')
      .delete()
      .eq('user_id', userId)
      .eq('name', categoryName.trim());

    if (error) {
      console.error('Gagal deleteUserPhraseCategoryFromCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error deleteUserPhraseCategoryFromCloud:', err);
    return false;
  }
}

/** Simpan skor kuis ke Supabase */
export async function saveUserQuizScoreToCloud(userId: string, tableId: string, score: number): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { error } = await sb
      .from('user_study_progress')
      .upsert({
        user_id: userId,
        table_id: tableId,
        score: score,
        last_practiced_at: new Date().toISOString()
      }, { onConflict: 'user_id, table_id' });

    if (error) {
      console.error('Gagal saveUserQuizScoreToCloud:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error saveUserQuizScoreToCloud:', err);
    return false;
  }
}


// ================= USER PREFERENCES (SETTINGS) HELPERS =================

/** Simpan preferensi pengguna (kecepatan audio, status audio, tema) ke Supabase */
export async function saveUserPreferencesToCloud(userId: string, prefs: { audioSpeed?: number; isAudioEnabled?: boolean; theme?: string }): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    // 1. Simpan ke user_metadata Supabase Auth (selalu tersedia & instan)
    await sb.auth.updateUser({
      data: {
        preferences: prefs
      }
    });

    // 2. Simpan juga ke tabel user_preferences jika tabel tersebut sudah dijalankan di SQL
    try {
      await sb
        .from('user_preferences')
        .upsert({
          user_id: userId,
          audio_speed: prefs.audioSpeed,
          audio_enabled: prefs.isAudioEnabled,
          theme: prefs.theme,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
    } catch {}

    return true;
  } catch (err) {
    console.warn('Gagal saveUserPreferencesToCloud:', err);
    return false;
  }
}

/** Ambil preferensi pengguna dari Supabase */
export async function fetchUserPreferencesFromCloud(user: any): Promise<{ audioSpeed?: number; isAudioEnabled?: boolean; theme?: string } | null> {
  if (!user) return null;
  // Cek metadata dulu
  if (user.user_metadata?.preferences) {
    return user.user_metadata.preferences;
  }
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data } = await sb
      .from('user_preferences')
      .select('audio_speed, audio_enabled, theme')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      return {
        audioSpeed: Number(data.audio_speed),
        isAudioEnabled: Boolean(data.audio_enabled),
        theme: data.theme
      };
    }
  } catch {}
  return null;
}
