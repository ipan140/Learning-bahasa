import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';
import {
  getStoredToken,
  goRegister,
  goLogin,
  goGoogleLogin,
  goGetMe,
  goLogout,
  goUpdateProfile,
  goFetchTargets,
  goAddTarget,
  goRemoveTarget,
  goBatchSyncTargets,
  goSaveTargetNotes,
  goFetchCustomTables,
  goSaveCustomTable,
  goDeleteCustomTable,
  goFetchProgress,
  goSaveProgress,
  goSaveQuizScore,
  goFetchPhrases,
  goSavePhrases,
  goDeletePhrases,
  goFetchPhraseCategories,
  goSavePhraseCategory,
  goDeletePhraseCategory,
  goFetchPreferences,
  goSavePreferences
} from './api';

// Cache client instance in memory
let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseConfig(): { url: string; anonKey: string } | null {
  // Hanya membaca dari environment variables (Vercel / .env lokal)
  const envUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const envKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (envUrl && envKey && !envKey.includes('your-anon-key') && !envKey.includes('paste_kunci_lengkap') && envKey.trim().length > 10) {
    return { url: envUrl.trim(), anonKey: envKey.trim() };
  }

  return null;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

/**
 * Cek apakah aplikasi sedang menggunakan mode Backend Go (Lokal / VPS)
 */
export function isGoBackendMode(): boolean {
  if (typeof window === 'undefined') {
    return Boolean(import.meta.env.PUBLIC_API_URL);
  }
  const hasGoToken = Boolean(getStoredToken());
  const hasApiUrl = Boolean(import.meta.env.PUBLIC_API_URL);
  const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  // Prioritas: Jika ada token Go, atau jika di localhost dan PUBLIC_API_URL diset, gunakan Go Backend
  if (hasGoToken) return true;
  if (hasApiUrl && isLocalHost) return true;
  if (hasApiUrl && !isSupabaseConfigured()) return true;

  return false;
}

export function isBackendConfigured(): boolean {
  return isGoBackendMode() || isSupabaseConfigured();
}

export function getActiveBackendInfo(): { type: 'go' | 'supabase'; label: string } {
  if (isGoBackendMode()) {
    return { type: 'go', label: 'Go REST API (PostgreSQL Lokal)' };
  }
  return { type: 'supabase', label: 'Supabase Cloud BaaS' };
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

let cachedUser: any = null;
let authListenerRegistered = false;

export async function getCurrentUser(): Promise<any | null> {
  // 1. Cek Go Backend jika aktif atau memiliki token tersimpan
  if (isGoBackendMode() || getStoredToken()) {
    try {
      const goUser = await goGetMe();
      if (goUser) {
        cachedUser = goUser;
        return goUser;
      }
    } catch (err) {
      console.warn('getCurrentUser Go warning:', err);
    }
  }

  // 2. Fallback ke Supabase jika configured
  const sb = getSupabase();
  if (!sb) return cachedUser;

  if (!authListenerRegistered && typeof window !== 'undefined') {
    authListenerRegistered = true;
    sb.auth.onAuthStateChange((_event, session) => {
      cachedUser = session?.user ?? null;
    });
  }

  try {
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

export async function signUpWithEmail(email: string, password: string, displayName?: string) {
  if (isGoBackendMode()) {
    const res = await goRegister(email, password, displayName);
    if (res.data?.user) {
      cachedUser = res.data.user;
    }
    return res;
  }

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
  if (isGoBackendMode()) {
    const res = await goLogin(email, password);
    if (res.data?.user) {
      cachedUser = res.data.user;
    }
    return res;
  }

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
  
  const envSiteUrl = import.meta.env.PUBLIC_SITE_URL;
  let redirectUrl: string | undefined = undefined;

  if (envSiteUrl && envSiteUrl.trim().length > 0) {
    redirectUrl = envSiteUrl.trim().endsWith('/') ? envSiteUrl.trim() : `${envSiteUrl.trim()}/`;
  } else if (typeof window !== 'undefined' && window.location.origin) {
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

export async function signInWithGoogleBackend(payload: { email: string; displayName?: string; avatarUrl?: string }) {
  const res = await goGoogleLogin(payload);
  if (res.data?.user) {
    cachedUser = res.data.user;
  }
  return res;
}

export async function signOutUser() {
  cachedUser = null;
  await goLogout();
  const sb = getSupabase();
  if (sb) {
    try {
      await sb.auth.signOut();
    } catch (err) {
      console.warn('signOutUser warning:', err);
    }
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
  if (isGoBackendMode()) {
    return await goUpdateProfile(displayName, avatarUrl);
  }

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

/** Ambil seluruh target negara user dari Cloud (Go Backend / Supabase) */
export async function fetchUserTargetsFromCloud(userId: string): Promise<string[]> {
  if (isGoBackendMode()) {
    const data = await goFetchTargets();
    return data.targets;
  }

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

/** Tambah satu target negara ke Cloud */
export async function addTargetToCloud(userId: string, countryId: string): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goAddTarget(countryId);
  }

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

/** Hapus satu target negara dari Cloud */
export async function removeTargetFromCloud(userId: string, countryId: string): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goRemoveTarget(countryId);
  }

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

/** Sinkronkan seluruh list target lokal ke Cloud (batch sync) */
export async function batchSyncTargetsToCloud(userId: string, countryIds: string[]): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goBatchSyncTargets(countryIds);
  }

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

/** Ambil seluruh tabel kustom buatan user dari Cloud */
export async function fetchUserCustomTablesFromCloud(userId: string): Promise<any[]> {
  if (isGoBackendMode()) {
    return await goFetchCustomTables();
  }

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

/** Simpan tabel kustom ke Cloud */
export async function saveCustomTableToCloud(userId: string, table: any): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goSaveCustomTable(table);
  }

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

/** Hapus tabel kustom dari Cloud */
export async function deleteCustomTableFromCloud(userId: string, tableId: string): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goDeleteCustomTable(tableId);
  }

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

/** Ambil seluruh progres belajar aksara user dari Cloud */
export async function fetchUserProgressFromCloud(userId: string): Promise<Record<string, string[]>> {
  if (isGoBackendMode()) {
    return await goFetchProgress();
  }

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

/** Simpan progres huruf yang dihafal untuk suatu tabel aksara ke Cloud */
export async function saveUserProgressToCloud(
  userId: string,
  tableId: string,
  memorizedChars: string[],
  score: number = 0
): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goSaveProgress(tableId, memorizedChars, score);
  }

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

/** Ambil target negara beserta catatannya dari Cloud */
export async function fetchUserTargetsWithNotesFromCloud(userId: string): Promise<Record<string, string>> {
  if (isGoBackendMode()) {
    const data = await goFetchTargets();
    return data.notes;
  }

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

/** Simpan catatan pribadi untuk target negara di Cloud */
export async function saveTargetNoteToCloud(userId: string, countryId: string, notes: string): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goSaveTargetNotes(countryId, notes);
  }

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

/** Ambil seluruh kumpulan frasa kustom pengguna dari Cloud */
export async function fetchUserPhrasesFromCloud(userId: string): Promise<Record<string, any>> {
  if (isGoBackendMode()) {
    return await goFetchPhrases();
  }

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

/** Simpan kumpulan frasa untuk satu bahasa ke Cloud */
export async function saveUserPhrasesToCloud(userId: string, languageId: string, categories: any[]): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goSavePhrases(languageId, categories);
  }

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

/** Hapus frasa kustom untuk satu bahasa di Cloud */
export async function deleteUserPhrasesFromCloud(userId: string, languageId: string): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goDeletePhrases(languageId);
  }

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

// ================= PHRASE CATEGORIES HELPERS =================

/** Ambil daftar kategori frasa kustom buatan pengguna dari Cloud */
export async function fetchUserPhraseCategoriesFromCloud(userId: string): Promise<string[]> {
  if (isGoBackendMode()) {
    return await goFetchPhraseCategories();
  }

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

/** Simpan satu nama kategori frasa baru ke Cloud */
export async function saveUserPhraseCategoryToCloud(userId: string, categoryName: string): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goSavePhraseCategory(categoryName);
  }

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

/** Hapus kategori frasa kustom dari Cloud */
export async function deleteUserPhraseCategoryFromCloud(userId: string, categoryName: string): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goDeletePhraseCategory(categoryName);
  }

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

/** Simpan skor kuis ke Cloud */
export async function saveUserQuizScoreToCloud(userId: string, tableId: string, score: number): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goSaveQuizScore(tableId, score);
  }

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

// ================= USER PREFERENCES & FAVORITES (SETTINGS) HELPERS =================

/** Simpan daftar frasa favorit (bookmark) pengguna ke Cloud */
export async function saveFavoritePhrasesToCloud(favorites: string[]): Promise<boolean> {
  if (isGoBackendMode()) {
    return true;
  }

  const sb = getSupabase();
  if (!sb) return false;
  try {
    await sb.auth.updateUser({
      data: {
        favorite_phrases: favorites
      }
    });
    return true;
  } catch (err) {
    console.warn('Gagal saveFavoritePhrasesToCloud:', err);
    return false;
  }
}

/** Ambil daftar frasa favorit pengguna dari Cloud */
export function fetchFavoritePhrasesFromCloud(user: any): string[] {
  if (!user) return [];
  if (Array.isArray(user.user_metadata?.favorite_phrases)) {
    return user.user_metadata.favorite_phrases;
  }
  return [];
}

/** Simpan preferensi pengguna (kecepatan audio, status audio, tema) ke Cloud */
export async function saveUserPreferencesToCloud(
  userId: string,
  prefs: { audioSpeed?: number; isAudioEnabled?: boolean; theme?: string }
): Promise<boolean> {
  if (isGoBackendMode()) {
    return await goSavePreferences(prefs);
  }

  const sb = getSupabase();
  if (!sb) return false;
  try {
    await sb.auth.updateUser({
      data: {
        preferences: prefs
      }
    });

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

/** Ambil preferensi pengguna dari Cloud */
export async function fetchUserPreferencesFromCloud(user: any): Promise<{ audioSpeed?: number; isAudioEnabled?: boolean; theme?: string } | null> {
  if (isGoBackendMode()) {
    return await goFetchPreferences();
  }

  if (!user) return null;
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
