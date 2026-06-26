/** Scrolls to a section by id, respecting prefers-reduced-motion. No-op during SSR. */
export function scrollToSection(id: string) {
  if (import.meta.client) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start'
    })
  }
}
