export const COOKIE_PREFERENCES_KEY = 'cookie_preferences';
export const COOKIE_CONSENT_MAX_AGE_MONTHS = 12;

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  timestamp: string;
}

const isBrowser = (): boolean => typeof window !== 'undefined';

const isValidPreferences = (value: unknown): value is CookiePreferences => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.essential === 'boolean' &&
    typeof candidate.analytics === 'boolean' &&
    typeof candidate.timestamp === 'string' &&
    !Number.isNaN(new Date(candidate.timestamp).getTime())
  );
};

export const parseCookiePreferences = (raw: string | null): CookiePreferences | null => {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!isValidPreferences(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

export const isExpired = (preferences: CookiePreferences): boolean => {
  const savedAt = new Date(preferences.timestamp);
  const expiryThreshold = new Date();
  expiryThreshold.setMonth(expiryThreshold.getMonth() - COOKIE_CONSENT_MAX_AGE_MONTHS);
  return savedAt < expiryThreshold;
};

export const getConsent = (): CookiePreferences | null => {
  if (!isBrowser()) return null;

  const parsed = parseCookiePreferences(localStorage.getItem(COOKIE_PREFERENCES_KEY));
  if (!parsed) return null;

  if (isExpired(parsed)) {
    localStorage.removeItem(COOKIE_PREFERENCES_KEY);
    return null;
  }

  return parsed;
};

export const hasConsent = (): boolean => getConsent() !== null;

export const saveConsent = (
  preferences: Omit<CookiePreferences, 'timestamp'> & { timestamp?: string }
): CookiePreferences => {
  const normalized: CookiePreferences = {
    essential: preferences.essential,
    analytics: preferences.analytics,
    timestamp: preferences.timestamp ?? new Date().toISOString()
  };

  if (isBrowser()) {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(normalized));
  }

  return normalized;
};

export const clearConsent = (): void => {
  if (!isBrowser()) return;
  localStorage.removeItem(COOKIE_PREFERENCES_KEY);
};
