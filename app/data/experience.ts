import type { ExperienceEntry } from '~/types'

/**
 * Línea de tiempo de experiencia (sección Trayectoria), del rol actual al primero.
 * Textos traducibles en i18n (roleKey/descKey); aquí solo estructura.
 */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: '2026 — Hoy',
    roleKey: 'experience.tdh.role',
    company: 'Transportes del Huila',
    descKey: 'experience.tdh.desc',
    tags: ['.NET Core', 'Vue.js', 'Fullstack']
  },
  {
    period: '2023 — 2026',
    roleKey: 'experience.metrix.role',
    company: 'MetrixAL',
    descKey: 'experience.metrix.desc',
    tags: ['Java · Spring', 'Microservicios', 'K3s', 'AWS', 'Gitea']
  },
  {
    period: '2022 — 2023',
    roleKey: 'experience.lian.role',
    company: 'LianBPO',
    descKey: 'experience.lian.desc',
    tags: ['Laravel', 'Vue.js', 'PostgreSQL']
  }
]
