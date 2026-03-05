export const MODE = import.meta.env.MODE;
export const IS_PROD = import.meta.env.MODE === "production";
export const IS_DEV = import.meta.env.MODE === "development";

const DEFINED_API_HOST = import.meta.env.VITE_SERVER_URL as string;

export const PRODUCTION_URL = "https://kris-customs.com/";
export const BASE_URL = import.meta.env.SSR
  ? PRODUCTION_URL
  : window.location.origin;

export const SUPPORTED_API_HOSTS = {
  prod: import.meta.env.VITE_API_PROD as string,
  dev: import.meta.env.VITE_API_DEV as string,
} as const;

export const SERVER_URL = DEFINED_API_HOST || SUPPORTED_API_HOSTS.prod;
export const MEDIA_URL = import.meta.env.VITE_EXTERNAL_ASSETS_URL as string;

export const USKV_BINDINGS = {
  name: {
    settings: "settings",
    favorites: "favorites",
  },
  key: {
    theme: "theme",
    language: "language",
  },
} as const;

export const SUPPORTED_THEMES = ["light", "dark"] as const;
export const FALLBACK_THEME = "dark";

export const OTP_LEN = 6;
export const USERNAME_LEN = {
  min: 3,
  max: 55,
};

export const RETRIES_COUNT = 2;
export const OTP_RESEND_COUNTDOWN = 60;

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const EXTERNAL = {
  instagram: "https://www.instagram.com/nailss_by_kris?igsh=dW9rcHdjNHp6bmRu",
};

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
