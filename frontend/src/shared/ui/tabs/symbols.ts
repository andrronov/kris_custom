import type { InjectionKey } from "vue";
import type { ComponentTabVariant, ComponentSize } from "@/shared/types";

export const StateKey: InjectionKey<{
  active: () => string | number;
  variant: () => ComponentTabVariant;
  size: () => ComponentSize;
  selectTab: (tab: string | number) => void;
}> = Symbol("TabsState");
