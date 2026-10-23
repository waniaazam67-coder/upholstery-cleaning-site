/** True when the visitor has asked their device for less motion. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Runs `callback` at most once per animation frame, however often it is called. */
export function onEveryFrame(callback: () => void): () => void {
  let queued = false;
  return () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      callback();
    });
  };
}
