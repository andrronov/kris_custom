import type { ProductCardSize } from "../types";

export const PRODUCT_CARD_CLASSES: Record<ProductCardSize, string> = {
  base: "max-w-[265px] min-h-[334px] md:max-w-[295px] md:min-h-[364px] lg:max-w-[395px] lg:min-h-[464px]",
  small:
    "max-w-[176px] min-h-[244px] md:max-w-[220px] md:min-h-[264px] lg:max-w-[272px] lg:min-h-[364px]",
};
