import type { BasicColorSchema } from "@vueuse/core";
import type { Language } from "@kris-customs/shared/types";

export type AppTheme = "dark" | "light";

export type Platform = "landing" | "product" | "catalog";

export type USKV = {
  settings: {
    theme: BasicColorSchema;
    language: Language;
  };
  favorites: string[];
};

export type USKVNamespace = keyof USKV;

export type APIWrapper<T> = {
  code: number;
  error?: string | null;
  data?: T | null;
};
export type APIError = {
  code: number;
  message: string;
};

export type ComponentSize = "lg" | "md" | "sm" | "xs";
export type ComponentStatus = "info" | "success" | "warning" | "error";
export type ComponentBrandColors = "primary" | "secondary" | "accent";
export type ComponentColor = ComponentBrandColors | "ghost" | ComponentStatus;
export type ComponentShape = "circle" | "square";

export type ComponentTabVariant = "bordered" | "lifted" | "boxed" | "separated";
export type ComponentButtonVariant = "outline" | "link" | "dropdown-item";

export type AuthModalState = "signin";
export type AuthFormState = AuthModalState | "otp";

export enum Keys {
  Space = " ",
  Enter = "Enter",
  Escape = "Escape",
  Backspace = "Backspace",
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
  ArrowRight = "ArrowRight",
  ArrowDown = "ArrowDown",
  Home = "Home",
  End = "End",
  PageUp = "PageUp",
  PageDown = "PageDown",
  Tab = "Tab",
}

export type SidebarType = "user" | "cart" | null;

export type DiscountCard = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export type APIOtpResponse = {
  message: string;
  user: APIUserResponse | null;
};

export type APIUserResponse = {
  id: string;
  email: string;
  // birthDate: string; // ??? @example: 2004-01-14 00:00:00
  // createdAt: string; // ??? @example: 2026-01-05 18:21:08.09575
  name: string;
  // addresses: Object; // to type
  // orders: Object; // to type
  // promotionUsages: Object; // to type
};

export type APIAuthResponse = {
  message: string;
  user: APIUserResponse;
};
