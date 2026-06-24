import { Platform } from 'react-native';

import type { AuthResponse } from '@/lib/api';

const STORAGE_KEY = 'vaultu.authSession';

let nativeSession: AuthResponse | null = null;

export async function saveAuthSession(session: AuthResponse) {
  nativeSession = session;

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }
}

export async function getAuthSession() {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? (JSON.parse(value) as AuthResponse) : null;
  }

  return nativeSession;
}

export async function clearAuthSession() {
  nativeSession = null;

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}
