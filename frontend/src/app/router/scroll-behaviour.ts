import { usePreferredReducedMotion } from "@vueuse/core";
import type { RouterScrollBehavior } from "vue-router";
import { isDefined } from "@/shared/lib/utils";

const preferredMotion = usePreferredReducedMotion();

export const scrollBehavior: RouterScrollBehavior = (
  to,
  from,
  savedPosition,
) => {
  if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          el: to.hash,
          top: 100,
          behavior: preferredMotion.value !== "reduce" ? "smooth" : "auto",
        });
      }, 150);
    });
  }

  if (savedPosition) {
    return savedPosition;
  }

  if (
    isDefined(to.meta.routeKey) &&
    isDefined(from.meta.routeKey) &&
    to.meta.routeKey === from.meta.routeKey
  ) {
    return;
  }

  if (to.name === from.name) {
    return;
  }

  return { top: 0 };
};
