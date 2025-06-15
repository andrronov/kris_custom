const anchors = ["discounts", "best-sellers"] as const;

type Anchor = (typeof anchors)[number];

export const anchor = {
  prepare: (anchor: Anchor) => `#${anchor}`,
  get: (anchor: Anchor) => anchor,
};
