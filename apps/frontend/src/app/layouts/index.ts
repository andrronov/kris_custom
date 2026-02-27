import Default from "./Default.vue";

export const layouts = {
  default: Default,
} as const;

export type Layout = keyof typeof layouts;
