import type Lenis from "lenis";

/** Offset por el navbar fijo al hacer scroll a anclas */
export const SCROLL_NAV_OFFSET = -96;

const SCROLL_RETRY_MS = 50;
const SCROLL_RETRY_MAX = 40;

export function parseHashHref(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return { path: href, hash: null as string | null };
  }

  const path = href.slice(0, hashIndex) || "/";
  const hash = href.slice(hashIndex + 1);
  return { path, hash: hash || null };
}

export function sectionSelector(hash: string) {
  return hash.startsWith("#") ? hash : `#${hash}`;
}

/** Espera a que exista el ancla (p. ej. secciones con `dynamic()`) antes de scroll. */
export function scrollToSection(
  hash: string,
  options: {
    lenis?: Lenis | null;
    offset?: number;
    onMissing?: () => void;
  } = {},
) {
  const selector = sectionSelector(hash.replace(/^#/, ""));
  const offset = options.offset ?? SCROLL_NAV_OFFSET;
  let attempts = 0;

  const tryScroll = () => {
    const el = document.querySelector(selector);
    if (!el) {
      attempts += 1;
      if (attempts < SCROLL_RETRY_MAX) {
        window.setTimeout(tryScroll, SCROLL_RETRY_MS);
        return;
      }
      options.onMissing?.();
      return;
    }

    if (options.lenis) {
      options.lenis.scrollTo(el, {
        offset,
        force: options.lenis.isStopped,
      });
      return;
    }

    const top =
      el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  tryScroll();
}
