import { prefersReducedMotion } from "./motion";

/** Elements marked with this attribute slide up into view as they are scrolled to. */
const SELECTOR = "[data-reveal]";
/** Delay between siblings in the same group, for a staggered entrance. */
const STAGGER_SECONDS = 0.09;
/** Safety net: show everything after this long, even if an observer never fires. */
const FAILSAFE_MS = 12_000;

export function initScrollReveal(): void {
  if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;

  const reveal = (element: Element) => {
    element.classList.remove("reveal-pending");
    element.classList.add("reveal-done");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  const viewportHeight = window.innerHeight;

  for (const element of document.querySelectorAll<HTMLElement>(SELECTOR)) {
    // Anything already on screen at load stays visible: the first screen is never hidden.
    if (element.getBoundingClientRect().top < viewportHeight) continue;

    const position = [...(element.parentElement?.children ?? [])].indexOf(element);
    element.style.setProperty("--reveal-delay", `${(position % 4) * STAGGER_SECONDS}s`);
    element.classList.add("reveal-pending");
    observer.observe(element);
  }

  window.setTimeout(
    () => document.querySelectorAll(".reveal-pending").forEach(reveal),
    FAILSAFE_MS,
  );
}
