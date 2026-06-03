import type { NowItem } from '~/types'

/**
 * Estado actual (sección Ahora), como tarjetas de un dashboard.
 * CONTENIDO DE EJEMPLO: los valores son placeholder hasta validar el estado real.
 * La etiqueta (construyendo/operando/…) vive en i18n (labelKey).
 * El valor principal también vive en i18n (valueKey) para soportar bilingüismo.
 */
export const NOW: NowItem[] = [
  { labelKey: 'nowLabels.building', valueKey: 'nowValues.building' },
  { labelKey: 'nowLabels.operating', valueKey: 'nowValues.operating' },
  { labelKey: 'nowLabels.studying', valueKey: 'nowValues.studying' },
  { labelKey: 'nowLabels.reading', valueKey: 'nowValues.reading' },
  {
    labelKey: 'nowLabels.exploring',
    valueKey: 'nowValues.exploring',
    metaKey: 'nowLabels.exploringMeta'
  }
]
