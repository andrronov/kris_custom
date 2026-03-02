const anchors = [
  "discounts",
  "best-sellers",
  "how-get-new-nails",
  "why-us",
  "faq",
] as const;

type Anchor = (typeof anchors)[number];

export const anchor = {
  prepare: (anchor: Anchor) => `#${anchor}`,
  get: (anchor: Anchor) => anchor,
};
