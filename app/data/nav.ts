import type { NavSection } from '~/types'

/**
 * Secciones de la página, en orden.
 * Fuente única de verdad para el sidebar (diagrama) y el nav móvil (pills).
 * El label se resuelve por i18n: `t('nav.' + section.id)`.
 */
export const NAV_SECTIONS: NavSection[] = [
  { id: 'about', num: '01' },
  { id: 'experience', num: '02' },
  { id: 'work', num: '03' },
  { id: 'decisions', num: '04' },
  { id: 'stack', num: '05' },
  { id: 'now', num: '06' }
]
