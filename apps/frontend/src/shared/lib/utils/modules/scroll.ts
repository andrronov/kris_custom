import { usePreferredReducedMotion } from "@vueuse/core";

const preferredMotion = usePreferredReducedMotion();

const defaultOptions: ScrollIntoViewOptions = {
  behavior: "smooth",
  block: "center",
  inline: "center",
};

export const scrollIntoView = (
  element: HTMLElement | null,
  highlight = false,
  scrollIntoViewOptions: ScrollIntoViewOptions = defaultOptions,
) => {
  if (!element) {
    console.warn("Element is not defined");
    return;
  }

  element.scrollIntoView({
    ...defaultOptions,
    block: scrollIntoViewOptions.block,
    inline: scrollIntoViewOptions.inline,
    behavior:
      preferredMotion.value === "reduce"
        ? "auto"
        : scrollIntoViewOptions.behavior,
  });

  if (highlight) {
    element.style.transition = "box-shadow 0.3s ease-in-out";
    element.style.boxShadow = "0 0 8px 0 #ffb70089";

    setTimeout(() => {
      element.style.boxShadow = "";
    }, 3000);
  }
};

export const scrollToTop = (behavior: ScrollBehavior = "auto") => {
  window.scrollTo({ top: 0, behavior });
};

/*
 * @see https://stackoverflow.com/a/13382873
 */
export const getScrollbarWidth = () => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode && outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};

export const setScrollbarWidth = (value: number) => {
  if (!import.meta.env.SSR) {
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${value}px`,
    );
  }
};

export const applyScrollbarWidth = () => {
  setScrollbarWidth(getScrollbarWidth());
};

export const setScrollLock = (value: boolean) => {
  const doc = document.documentElement;
  const attribute = "data-lock-scroll";

  if (value && !doc.hasAttribute(attribute)) {
    doc.setAttribute(attribute, "true");
  } else {
    doc.removeAttribute(attribute);
  }
};
