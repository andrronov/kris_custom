import type { BasicColorSchema } from "@vueuse/core";
import { SUPPORTED_LANGUAGES } from "@/shared/config";

export type AppTheme = "dark" | "light";
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export type Platform = "landing";

export type ComponentSize = "lg" | "md" | "sm" | "xs";
export type ComponentStatus = "info" | "success" | "warning" | "error";
export type ComponentBrandColors = "primary" | "secondary" | "accent";
export type ComponentColor = ComponentBrandColors | "ghost" | ComponentStatus;
export type ComponentShape = "circle" | "square";

export type ComponentTabVariant = "bordered" | "lifted" | "boxed" | "separated";

export type AuthModalState = "signup" | "signin";
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

export type ProductPrice = number | [number, number];
export type ProductImage = string | [string, string];

export type Product = {
  id: string;
  name: string;
  price: ProductPrice;
  decor: ProductImage;
};

export type DiscountCard = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export type USKV = {
  settings: {
    theme: BasicColorSchema;
    language: Language;
  };
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
