import { objectEntries } from "@/shared/lib/utils";

export const SUPPORTED_THEMES = ["light", "dark"] as const;
export const FALLBACK_THEME = "dark";

export const LANGUAGES = {
  en: {
    label: "English",
    icon: "/images/flags/gb.svg"
  },
  sp: {
    label: "Español",
    icon: "/images/flags/es.svg"
  },
} as const;
export const LANGUAGES_LIST = objectEntries(LANGUAGES).map(
  ([value, { label, icon }]) => ({
    value,
    label,
    icon
  }),
);
export const SUPPORTED_LANGUAGES = LANGUAGES_LIST.map(({ value }) => value);
export const FALLBACK_LANGUAGE = "en";

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
