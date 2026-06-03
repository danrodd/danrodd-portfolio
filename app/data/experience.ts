import type { ExperienceEntry } from '~/types'

/**
 * Línea de tiempo de experiencia (sección Trayectoria).
 * CONTENIDO DE EJEMPLO: cargos, empresas y descripciones son placeholder hasta
 * validar la información real. Los textos traducibles viven en i18n (roleKey/descKey).
 */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: '20XX',
    current: true,
    roleKey: 'experience.e1.role',
    company: 'Empresa Uno',
    descKey: 'experience.e1.desc',
    tags: ['Tecnología A', 'Tecnología B', 'Tecnología C']
  },
  {
    period: '20XX — 20XX',
    roleKey: 'experience.e2.role',
    company: 'Empresa Dos',
    descKey: 'experience.e2.desc',
    tags: ['Tecnología A', 'Tecnología D', 'Tecnología E']
  },
  {
    period: '20XX — 20XX',
    roleKey: 'experience.e3.role',
    company: 'Empresa Tres',
    descKey: 'experience.e3.desc',
    tags: ['Tecnología B', 'Tecnología F']
  }
]
