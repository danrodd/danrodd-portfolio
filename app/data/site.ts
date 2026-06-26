/**
 * Central contact and site config — single source of truth.
 *
 * TODO: replace placeholders with real contact data before launch.
 *   email    → your real email address
 *   github   → your GitHub profile URL
 *   linkedin → your LinkedIn profile URL
 *   whatsapp → your WhatsApp link (format: https://wa.me/<country><number>)
 *
 * The canonical site URL (SITE_URL / dannrodd.com) lives in nuxt.config.ts
 * as the single authoritative source for SEO/i18n/sitemap. Do not duplicate it here.
 */

export interface SiteContact {
  /** Public contact email. */
  email: string
  /** GitHub profile URL. */
  github: string
  /** LinkedIn profile URL. */
  linkedin: string
  /** WhatsApp deep-link (https://wa.me/…). */
  whatsapp: string
}

export const SITE_CONTACT: SiteContact = {
  email: 'contacto@danrodd.dev',
  github: 'https://github.com/danrodd',
  linkedin: 'https://www.linkedin.com/in/danrodd',
  whatsapp: 'https://wa.me/573012106430'
} as const
