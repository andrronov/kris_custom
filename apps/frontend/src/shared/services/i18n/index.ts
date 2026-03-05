import { computed } from "vue";
import { createI18n } from "vue-i18n";
import {
  SUPPORTED_LANGUAGES,
  FALLBACK_LANGUAGE,
} from "@kris-customs/shared/config";
import type { Language } from "@kris-customs/shared/types";
import en from "./locales/en.json";
import sp from "./locales/sp.json";

const isSupportedLanguage = (lang: string): lang is Language => {
  return ((SUPPORTED_LANGUAGES ?? []) as string[]).includes(lang);
};

const guessDefaultLocale = (prediction: string) => {
  const lang = prediction && prediction.toLowerCase().split("-")[0];

  return isSupportedLanguage(lang) ? lang : FALLBACK_LANGUAGE;
};

const messages = {
  en,
  sp,
};

const instance = createI18n({
  legacy: false,
  messages,
  locale: import.meta.env.SSR
    ? FALLBACK_LANGUAGE
    : guessDefaultLocale(navigator.language),
  fallbackLocale: FALLBACK_LANGUAGE,
  formatFallbackMessages: true,
  runtimeOnly: false,
  globalInjection: true,
});

const locale = computed({
  get: () => instance.global.locale.value,
  set: (value: Language) => (instance.global.locale.value = value),
});

const i18n = {
  instance,
  locale,
  messages,
};

export { i18n };
export default instance;
