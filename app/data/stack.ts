import type { StackLayer } from '~/types'

/**
 * Stack por capas (sección Stack). CONTENIDO REAL: son tecnologías públicas y
 * seguras de mostrar. Vistas como capas del request del usuario hasta el hierro,
 * más una capa transversal de observabilidad. El verbo de uso vive en i18n (verbKey).
 */
export const STACK: StackLayer[] = [
  {
    idx: 'L1',
    name: 'Frontend',
    verbKey: 'verbs.develop',
    techs: ['Vue', 'Nuxt', 'Tailwind', 'TanStack', 'SSR']
  },
  {
    idx: 'L2',
    name: 'Backend',
    verbKey: 'verbs.govern',
    techs: ['Java · Spring', 'Laravel', 'FastAPI', '.NET']
  },
  {
    idx: 'L3',
    name: 'Data',
    verbKey: 'verbs.model',
    techs: ['PostgreSQL', 'MariaDB', 'MongoDB', 'MinIO']
  },
  {
    idx: 'L4',
    name: 'Infra · DevSecOps',
    verbKey: 'verbs.govern',
    techs: ['Kubernetes · K3s', 'Docker', 'Gitea', 'Rocky Linux']
  },
  {
    idx: 'L5',
    name: 'Cloud',
    verbKey: 'verbs.operate',
    techs: ['AWS', 'EC2 · S3', 'Route 53', 'WAF', 'VPN híbrida']
  },
  {
    idx: '∞',
    name: 'Observability',
    verbKey: 'verbs.instrument',
    techs: ['Prometheus', 'Grafana', 'Zipkin', 'Loki'],
    crosscutting: true
  }
]
