import { prefersReducedMotion } from "./motion";

const BUBBLE_COUNT = 14;

/** Fills the container with soft foam bubbles that drift upwards (styled in Hero.astro). */
export function initHeroBubbles(container: HTMLElement): void {
  if (prefersReducedMotion()) return;

  for (let i = 0; i < BUBBLE_COUNT; i++) {
    const bubble = document.createElement("span");
    const size = 10 + Math.random() * 34;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${9 + Math.random() * 10}s`;
    // Negative delay so bubbles are already mid-way up when the page opens.
    bubble.style.animationDelay = `${-Math.random() * 18}s`;

    container.append(bubble);
  }
}
