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
export type AuthFormState = AuthModalState | "reset";

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

export type APIError = {
  code: number;
  message: string;
};
