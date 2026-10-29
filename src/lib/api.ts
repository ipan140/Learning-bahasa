/**
 * Learning Bahasa - Go Backend REST API Client
 * Berkomunikasi langsung dengan server Go (Echo) di http://localhost:5000/api
 */

const TOKEN_KEY = 'learning_bahasa_jwt_token';
const USER_CACHE_KEY = 'learning_bahasa_cached_user';

export function getApiBaseUrl(): string {
  const envUrl = import.meta.env.PUBLIC_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  // Default URL lokal backend Go
  return 'http://localhost:5000/api';
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_CACHE_KEY);
}

export function getStoredUser(): any | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: any): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
  } catch {}
}

/**
 * Universal fetch wrapper dengan Header Authorization otomatis
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; message: string; data?: T; error?: any }> {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      // Jika token expired / invalid (401), bersihkan token lokal
      if (res.status === 401) {
        clearStoredToken();
      }
      return {
        success: false,
        message: json.message || `Request gagal dengan status ${res.status}`,
        error: json,
      };
    }

    return {
      success: true,
      message: json.message || 'Berhasil',
      data: json.data !== undefined ? json.data : json,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Tidak dapat terhubung ke server Backend Go.',
      error: err,
    };
  }
}

// ================= AUTH API =================

export async function goRegister(email: string, password: string, displayName?: string) {
  const res = await apiFetch<{ token: string; user: any }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      display_name: displayName || email.split('@')[0],
    }),
  });

  if (res.success && res.data?.token) {
    setStoredToken(res.data.token);
    const u = transformGoUser(res.data.user);
    setStoredUser(u);
    return { data: { user: u, session: { access_token: res.data.token } }, error: null };
  }
  return { data: null, error: new Error(res.message) };
}

export async function goLogin(email: string, password: string) {
  const res = await apiFetch<{ token: string; user: any }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (res.success && res.data?.token) {
    setStoredToken(res.data.token);
    const u = transformGoUser(res.data.user);
    setStoredUser(u);
    return { data: { user: u, session: { access_token: res.data.token } }, error: null };
  }
  return { data: null, error: new Error(res.message) };
}

export async function goGoogleLogin(payload: { email: string; displayName?: string; avatarUrl?: string }) {
  const res = await apiFetch<{ token: string; user: any }>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({
      email: payload.email,
      displayName: payload.displayName || payload.email.split('@')[0],
      avatarUrl: payload.avatarUrl || '',
    }),
  });

  if (res.success && res.data?.token) {
    setStoredToken(res.data.token);
    const u = transformGoUser(res.data.user);
    setStoredUser(u);
    return { data: { user: u, session: { access_token: res.data.token } }, error: null };
  }
  return { data: null, error: new Error(res.message) };
}

export async function goGetMe() {
  const token = getStoredToken();
  if (!token) return null;

  const res = await apiFetch('/auth/me', { method: 'GET' });
  if (res.success && res.data) {
    const u = transformGoUser(res.data);
    setStoredUser(u);
    return u;
  }
  // Jika gagal ambil data fresh dari server, gunakan cache jika ada
  return getStoredUser();
}

export async function goUpdateProfile(displayName: string, avatarUrl?: string) {
  const res = await apiFetch('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify({
      display_name: displayName,
      avatar_url: avatarUrl || '',
    }),
  });

  if (res.success && res.data) {
    const u = transformGoUser(res.data);
    setStoredUser(u);
    return true;
  }
  return false;
}

export async function goLogout() {
  clearStoredToken();
}

/**
 * Normalisasi objek user Go Backend agar memiliki format kompatibel dengan Supabase User
 */
function transformGoUser(raw: any): any {
  if (!raw) return null;
  const id = raw.id || raw.userId || '';
  const email = raw.email || '';
  const displayName = raw.displayName || raw.display_name || email.split('@')[0];
  const avatarUrl = raw.avatarUrl || raw.avatar_url || '';

  return {
    id,
    email,
    user_metadata: {
      display_name: displayName,
      avatar_url: avatarUrl,
    },
    app_metadata: {
      provider: 'go-backend',
    },
    created_at: raw.createdAt || raw.created_at || new Date().toISOString(),
  };
}

// ================= TARGETS API =================

export async function goFetchTargets(): Promise<{ targets: string[]; notes: Record<string, string> }> {
  const res = await apiFetch<{ targets: string[]; notes: Record<string, string> }>('/targets', {
    method: 'GET',
  });
  if (res.success && res.data) {
    return {
      targets: Array.isArray(res.data.targets) ? res.data.targets : [],
      notes: res.data.notes || {},
    };
  }
  return { targets: [], notes: {} };
}

export async function goAddTarget(countryId: string): Promise<boolean> {
  const res = await apiFetch('/targets', {
    method: 'POST',
    body: JSON.stringify({ countryId }),
  });
  return res.success;
}

export async function goRemoveTarget(countryId: string): Promise<boolean> {
  const res = await apiFetch(`/targets/${encodeURIComponent(countryId)}`, {
    method: 'DELETE',
  });
  return res.success;
}

export async function goBatchSyncTargets(countryIds: string[]): Promise<boolean> {
  const res = await apiFetch('/targets/batch', {
    method: 'POST',
    body: JSON.stringify({ countryIds }),
  });
  return res.success;
}

export async function goSaveTargetNotes(countryId: string, notes: string): Promise<boolean> {
  const res = await apiFetch(`/targets/${encodeURIComponent(countryId)}/notes`, {
    method: 'PUT',
    body: JSON.stringify({ notes }),
  });
  return res.success;
}

// ================= CUSTOM TABLES API =================

export async function goFetchCustomTables(): Promise<any[]> {
  const res = await apiFetch<any[]>('/custom-tables', { method: 'GET' });
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
}

export async function goSaveCustomTable(table: any): Promise<boolean> {
  const payload = {
    id: table.id,
    name: table.name,
    script: table.voiceLang || table.script || '',
    voiceLang: table.voiceLang || table.script || '',
    description: table.description || '',
    rows: table.grid || table.rows || [],
  };

  const res = await apiFetch('/custom-tables', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.success;
}

export async function goDeleteCustomTable(tableId: string): Promise<boolean> {
  const res = await apiFetch(`/custom-tables/${encodeURIComponent(tableId)}`, {
    method: 'DELETE',
  });
  return res.success;
}

// ================= PROGRESS & QUIZ SCORES API =================

export async function goFetchProgress(): Promise<Record<string, string[]>> {
  const res = await apiFetch<any[]>('/progress', { method: 'GET' });
  const map: Record<string, string[]> = {};

  if (res.success && Array.isArray(res.data)) {
    res.data.forEach((p: any) => {
      const tableId = p.tableId || p.table_id;
      const chars = p.memorizedChars || p.memorized_chars;
      if (tableId) {
        map[tableId] = Array.isArray(chars) ? chars : [];
      }
    });
  }
  return map;
}

export async function goSaveProgress(
  tableId: string,
  memorizedChars: string[],
  score: number = 0,
  streakCount: number = 1
): Promise<boolean> {
  const res = await apiFetch('/progress', {
    method: 'POST',
    body: JSON.stringify({
      tableId,
      memorizedChars,
      score,
      streakCount,
    }),
  });
  return res.success;
}

export async function goSaveQuizScore(tableId: string, score: number): Promise<boolean> {
  const res = await apiFetch('/quiz-scores', {
    method: 'POST',
    body: JSON.stringify({
      tableId,
      score,
    }),
  });
  return res.success;
}

// ================= PHRASES & CATEGORIES API =================

export async function goFetchPhrases(): Promise<Record<string, any>> {
  const res = await apiFetch<any[]>('/phrases', { method: 'GET' });
  const map: Record<string, any> = {};

  if (res.success && Array.isArray(res.data)) {
    res.data.forEach((item: any) => {
      const langId = item.languageId || item.language_id;
      const cats = item.categories;
      if (langId) {
        map[langId] = Array.isArray(cats) ? cats : [];
      }
    });
  }
  return map;
}

export async function goSavePhrases(languageId: string, categories: any[]): Promise<boolean> {
  const res = await apiFetch('/phrases', {
    method: 'POST',
    body: JSON.stringify({
      languageId,
      categories,
    }),
  });
  return res.success;
}

export async function goDeletePhrases(languageId: string): Promise<boolean> {
  const res = await apiFetch(`/phrases/${encodeURIComponent(languageId)}`, {
    method: 'DELETE',
  });
  return res.success;
}

export async function goFetchPhraseCategories(): Promise<string[]> {
  const res = await apiFetch<any[]>('/phrase-categories', { method: 'GET' });
  if (res.success && Array.isArray(res.data)) {
    return res.data.map((c: any) => c.name).filter(Boolean);
  }
  return [];
}

export async function goSavePhraseCategory(name: string, icon: string = '💬'): Promise<boolean> {
  const res = await apiFetch('/phrase-categories', {
    method: 'POST',
    body: JSON.stringify({ name: name.trim(), icon }),
  });
  return res.success;
}

export async function goDeletePhraseCategory(name: string): Promise<boolean> {
  const res = await apiFetch(`/phrase-categories/${encodeURIComponent(name.trim())}`, {
    method: 'DELETE',
  });
  return res.success;
}

// ================= PREFERENCES API =================

export async function goFetchPreferences(): Promise<{
  theme?: string;
  audioSpeed?: number;
  audioEnabled?: boolean;
} | null> {
  const res = await apiFetch<any>('/preferences', { method: 'GET' });
  if (res.success && res.data) {
    return {
      theme: res.data.theme || 'light',
      audioSpeed: Number(res.data.audioSpeed || 1.0),
      audioEnabled: res.data.audioEnabled !== undefined ? Boolean(res.data.audioEnabled) : true,
    };
  }
  return null;
}

export async function goSavePreferences(prefs: {
  theme?: string;
  audioSpeed?: number;
  audioEnabled?: boolean;
}): Promise<boolean> {
  const res = await apiFetch('/preferences', {
    method: 'PUT',
    body: JSON.stringify({
      theme: prefs.theme,
      audioSpeed: prefs.audioSpeed,
      audioEnabled: prefs.audioEnabled,
    }),
  });
  return res.success;
}
