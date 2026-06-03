/**
 * Tipos de la estructura del sitio: navegación y datos estructurados
 * (experiencia, stack, "now") que NO viven en markdown.
 */

/**
 * Un nodo de navegación = una sección de la página.
 * El texto visible se resuelve por i18n con la clave `nav.<id>`.
 */
export interface NavSection {
  /** Id del `<section>` y ancla de scroll, ej. "about". */
  id: string
  /** Numeral mostrado, ej. "01". */
  num: string
}

/** Entrada de la línea de tiempo de experiencia (sección Trayectoria). */
export interface ExperienceEntry {
  /** Periodo de inicio, ej. "20XX". Static, language-neutral. */
  period: string
  /** Si true, el periodo cierra con la palabra localizada "present"/"Hoy". */
  current?: boolean
  /** Clave i18n del rol. */
  roleKey: string
  /** Empresa. */
  company: string
  /** Clave i18n de la descripción. */
  descKey: string
  /** Tecnologías/tags. */
  tags: string[]
}

/** Una capa del stack (sección Stack: L1..L5 + transversal). */
export interface StackLayer {
  /** Índice visible, ej. "L1" o "∞". */
  idx: string
  /** Nombre de la capa, ej. "Frontend". */
  name: string
  /** Clave i18n del verbo de uso (gobierno/desarrollo/opero…). */
  verbKey: string
  /** Tecnologías de la capa. */
  techs: string[]
  /** Si es transversal (observabilidad), se renderiza distinto. */
  crosscutting?: boolean
}

/** Item de la sección "Ahora". */
export interface NowItem {
  /** Clave i18n de la etiqueta (construyendo/operando/leyendo…). */
  labelKey: string
  /** Clave i18n del valor principal. */
  valueKey: string
  /** Clave i18n del meta/subtítulo (opcional). */
  metaKey?: string
}
