/** Adds a soft shadow under the sticky header once the page is scrolled. */
export function initHeaderShadow(header: HTMLElement): void {
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", update, { passive: true });
  update();
}
