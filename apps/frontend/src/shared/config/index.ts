import { objectEntries } from "@/shared/lib/utils";

export const MODE = import.meta.env.MODE;
export const IS_PROD = import.meta.env.MODE === "production";
export const IS_DEV = import.meta.env.MODE === "development";

const DEFINED_API_HOST = import.meta.env.VITE_SERVER_URL;

export const PRODUCTION_URL = "https://kris-customs.com/";
export const BASE_URL = import.meta.env.SSR
  ? PRODUCTION_URL
  : window.location.origin;

export const SUPPORTED_API_HOSTS = {
  prod: "https://api.kris-customs.com",
  dev: "http://localhost:8787/",
} as const;

export const SERVER_URL = DEFINED_API_HOST || SUPPORTED_API_HOSTS.prod;

export const USKV_BINDINGS = {
  name: {
    settings: "settings",
  },
  key: {
    theme: "theme",
    language: "language",
  },
} as const;

export const SUPPORTED_THEMES = ["light", "dark"] as const;
export const FALLBACK_THEME = "dark";

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
export const LANGUAGES_LIST = objectEntries(LANGUAGES).map(
  ([value, { label, icon }]) => ({
    value,
    label,
    icon,
  }),
);
export const SUPPORTED_LANGUAGES = LANGUAGES_LIST.map(({ value }) => value);
export const FALLBACK_LANGUAGE = "en";

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
