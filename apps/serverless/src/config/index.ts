export const CF_MINUTE = 60;
export const CF_5_MINUTES = CF_MINUTE * 5;
export const CF_DAY = 60 * 60 * 24;

export const CF_AUTH_EXP = CF_5_MINUTES;
export const CF_SESSION_EXP = CF_DAY * 30;

export const OTP_LENGTH = 6;

export const SESSION_COOKIE = "session_id";
export const getKVSessionKey = (sessionId: string) => `kc-session-${sessionId}`;

export const CONTEXT_USER = "user";
