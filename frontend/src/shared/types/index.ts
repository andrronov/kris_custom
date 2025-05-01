import { SUPPORTED_LANGUAGES } from "@/shared/config";

export type AppTheme = "dark" | "light";
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export type ComponentSize = "lg" | "md" | "sm" | "xs";
export type ComponentStatus = "info" | "success" | "warning" | "error";
export type ComponentBrandColors = "primary" | "secondary" | "accent";
export type ComponentColor = ComponentBrandColors | "ghost" | ComponentStatus;
export type ComponentShape = "circle" | "square";

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

export type ProductPrice = number | [number, number]
export type ProductImage = string | [string, string]

export type Product = {
  id: string,
  name: string,
  price: ProductPrice,
  image: ProductImage
}