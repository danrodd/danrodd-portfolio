import type { NowItem } from '~/types'

/**
 * Estado actual (sección Ahora), como tarjetas de un dashboard.
 * CONTENIDO DE EJEMPLO: los valores son placeholder hasta validar el estado real.
 * La etiqueta (construyendo/operando/…) vive en i18n (labelKey).
 */
export const NOW: NowItem[] = [
  { labelKey: 'nowLabels.building', value: 'Proyecto de ejemplo' },
  { labelKey: 'nowLabels.operating', value: 'Entorno de ejemplo' },
  { labelKey: 'nowLabels.studying', value: 'Programa de ejemplo' },
  { labelKey: 'nowLabels.reading', value: 'Lectura de ejemplo' },
  {
    labelKey: 'nowLabels.exploring',
    value: 'Tema A · Tema B · Tema C',
    metaKey: 'nowLabels.exploringMeta'
  }
]
