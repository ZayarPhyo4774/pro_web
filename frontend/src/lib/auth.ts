const ACCESS_KEY = 'echelon_access';
const REFRESH_KEY = 'echelon_refresh';

export type AuthTokens = {
  access: string;
  refresh: string;
};

export function getTokens(): AuthTokens | null {
  if (typeof window === 'undefined') return null;
  const access = localStorage.getItem(ACCESS_KEY);
  const refresh = localStorage.getItem(REFRESH_KEY);
  if (!access || !refresh) return null;
  return { access, refresh };
}

export function setTokens(tokens: AuthTokens) {
  localStorage.setItem(ACCESS_KEY, tokens.access);
  localStorage.setItem(REFRESH_KEY, tokens.refresh);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export function getAccessToken() {
  return typeof window !== 'undefined' ? localStorage.getItem(ACCESS_KEY) : null;
}
