import type { NowItem } from '~/types'

/**
 * Estado actual (sección Ahora), como tarjetas de un dashboard.
 * La etiqueta (construyendo/estudiando/…) vive en i18n (labelKey); el valor es plano.
 */
export const NOW: NowItem[] = [
  {
    labelKey: 'nowLabels.building',
    value: 'turnos.tdh.com.co',
    metaKey: 'nowLabels.buildingMeta'
  },
  {
    labelKey: 'nowLabels.studying',
    value: 'Ing. de Software · 5.º sem',
    metaKey: 'nowLabels.studyingMeta'
  },
  {
    labelKey: 'nowLabels.exploring',
    value: 'Go · SvelteKit',
    metaKey: 'nowLabels.exploringMeta'
  },
  {
    labelKey: 'nowLabels.improving',
    value: 'Inglés',
    metaKey: 'nowLabels.improvingMeta'
  }
]
