import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';

// Cache client instance in memory
let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseConfig(): { url: string; anonKey: string } | null {
  const defaultUrl = 'https://qqitquxjqupclhlunjq.supabase.co';

  // 1. Coba dari environment variable Astro
  const envUrl = import.meta.env.PUBLIC_SUPABASE_URL || defaultUrl;
  const envKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (envKey && !envKey.includes('your-anon-key')) {
    return { url: envUrl, anonKey: envKey };
  }

  // 2. Coba dari localStorage (pengaturan runtime di browser)
  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem('sb_custom_url') || defaultUrl;
    const localKey = localStorage.getItem('sb_custom_key');
    if (localKey && !localKey.includes('your-anon-key')) {
      return { url: localUrl, anonKey: localKey };
    }
  }

  return null;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sb_custom_url', url.trim());
    localStorage.setItem('sb_custom_key', anonKey.trim());
    supabaseInstance = null; // reset client
  }
}

export function clearSupabaseConfig() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('sb_custom_url');
    localStorage.removeItem('sb_custom_key');
    supabaseInstance = null;
  }
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

export async function getCurrentUser(): Promise<User | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data: { user } } = await sb.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

export async function signUpWithEmail(email: string, password: string) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase belum dikonfigurasi.');
  return await sb.auth.signUp({
    email,
    password,
  });
}

export async function signInWithEmail(email: string, password: string) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase belum dikonfigurasi.');
  return await sb.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOutUser() {
  const sb = getSupabase();
  if (!sb) return;
  return await sb.auth.signOut();
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
        script: table.script || '',
        description: table.description || '',
        rows: table.rows || [],
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
