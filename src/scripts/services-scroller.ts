import { onEveryFrame } from "./motion";

/**
 * Scroll-driven services row.
 *
 * The section is made taller than the screen and its content is pinned (position: sticky).
 * While the visitor scrolls down through that extra height, the row of cards moves sideways,
 * so normal vertical scrolling reveals the next cards. No swiping is needed.
 */
export function initServicesScroller(section: HTMLElement): void {
  const pin = section.querySelector<HTMLElement>("[data-scroller-pin]");
  const viewport = section.querySelector<HTMLElement>("[data-scroller-viewport]");
  const track = section.querySelector<HTMLElement>("[data-scroller-track]");
  const progressBar = section.querySelector<HTMLElement>("[data-scroller-progress]");
  const counter = section.querySelector<HTMLElement>("[data-scroller-count]");
  if (!pin || !viewport || !track || !progressBar || !counter) return;

  section.classList.add("is-scroll-driven");
  const cards = [...track.children] as HTMLElement[];

  /** How far (px) the track has to move sideways to show the last card. */
  let travel = 0;

  const renderProgress = (progress: number) => {
    const shownWidth = viewport.clientWidth + progress * travel;
    progressBar.style.transform = `scaleX(${Math.min(1, shownWidth / track.scrollWidth)})`;

    const trackStyle = getComputedStyle(track);
    const cardStep = cards[0].offsetWidth + (parseFloat(trackStyle.columnGap) || 0);
    const leftPadding = parseFloat(trackStyle.paddingLeft) || 0;
    const visibleCards = Math.round((shownWidth - leftPadding) / cardStep);
    counter.textContent = String(Math.min(cards.length, Math.max(1, visibleCards)));
  };

  const update = () => {
    const stickyTop = parseFloat(getComputedStyle(pin).top) || 0;
    const scrolledIn = stickyTop - section.getBoundingClientRect().top;
    const progress = travel > 0 ? Math.min(1, Math.max(0, scrolledIn / travel)) : 1;

    track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
    renderProgress(progress);
  };

  const measure = () => {
    track.style.transform = "";
    section.style.height = "";
    travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
    // Extra height = sideways travel, so 1px of vertical scroll moves the row 1px.
    section.style.height = `${pin.offsetHeight + travel}px`;
    update();
  };

  window.addEventListener("scroll", onEveryFrame(update), { passive: true });
  window.addEventListener("resize", onEveryFrame(measure));
  // Images and fonts change the card sizes once loaded, so measure again then.
  window.addEventListener("load", measure);
  measure();
}
