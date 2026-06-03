/** Scrolls smoothly to a section by id. No-op during SSR. */
export function scrollToSection(id: string) {
  if (import.meta.client) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
