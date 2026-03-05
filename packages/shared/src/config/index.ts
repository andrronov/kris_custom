export const CF_MINUTE = 60;
export const CF_5_MINUTES = CF_MINUTE * 5;
export const CF_DAY = 60 * 60 * 24;

export const CF_AUTH_EXP = CF_5_MINUTES;
export const CF_SESSION_EXP = CF_DAY * 30;

export const OTP_LENGTH = 6;

export const SESSION_COOKIE = "session_id";
export const getKVSessionKey = (sessionId: string) => `kc-session-${sessionId}`;

export const CONTEXT_USER = "user";

export const LANGUAGES = {
  en: {
    label: "English",
    icon: "/images/flags/gb.svg",
  },
  sp: {
    label: "Español",
    icon: "/images/flags/es.svg",
  },
} as const;

function objectEntries<T extends object, V extends keyof T>(
  obj: T,
): [V, T[V]][] {
  return Object.entries(obj) as [V, T[V]][];
}

export const LANGUAGES_LIST = objectEntries(LANGUAGES).map(
  ([value, { label, icon }]) => ({
    value,
    label,
    icon,
  }),
);
export const SUPPORTED_LANGUAGES = LANGUAGES_LIST.map(({ value }) => value);
export const FALLBACK_LANGUAGE = "en";
