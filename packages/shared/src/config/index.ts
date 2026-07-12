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

export const PRODUCT_SIZES = [
  "xxs",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
] as const;

export const PRODUCT_SHAPES = [
  "stilettos",
  "coffin",
  "square",
  "almond",
] as const;

export const PRODUCT_LENGTHS = ["short", "medium", "long"] as const;

export const PRODUCT_COLORS = [
  "pink",
  "blue",
  "black",
  "white",
  "red",
  "nude",
  "purple",
  "green",
  "clear",
] as const;

export const PRODUCT_FINISHES = [
  "glossy",
  "matte",
  "chrome",
  "velvet",
  "glitter",
] as const;

export const PRODUCT_STYLES = [
  "minimalist",
  "y2k",
  "anime",
  "goth",
  "cute",
  "elegant",
  "3d",
] as const;

export const ORDER_STATUSES = [
  "pending_payment",
  "paid",
  "in_progress",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export const PROMOTION_TYPES = [
  "PERCENTAGE",
  "FIXED_AMOUNT",
  "BUY_X_GET_Y",
  "FIRST_PURCHASE",
] as const;
