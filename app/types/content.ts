/**
 * Tipos del contenido en markdown (colección @nuxt/content).
 * Reflejan el frontmatter definido en `content.config.ts`.
 */

/** Caso de ingeniería — frontmatter de `content/cases/*.md` (sección Trabajo). */
export interface CaseMeta {
  /** Identificador visible, ej. "C/01". */
  id: string
  /** Año o rango, ej. "2024" o "2024–25". */
  year: string
  /** Orden de aparición (asc). */
  order: number
  /** Tecnologías/tags del caso. */
  stack: string[]
  /** Métrica de impacto, ej. "10:23 → 00:47 · −92%". */
  impact?: string
}

/** Estado de una decisión arquitectónica. */
export type AdrStatus = 'accepted' | 'proposed' | 'draft'

/** Decisión arquitectónica — frontmatter de `content/adrs/*.md` (sección Decisiones). */
export interface AdrMeta {
  /** Identificador, ej. "ADR-001". */
  id: string
  /** Estado de la decisión. */
  status: AdrStatus
  /** Fecha en formato corto, ej. "2026-04". */
  date: string
}
