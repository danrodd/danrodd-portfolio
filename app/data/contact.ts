/**
 * Datos de contacto — fuente única de verdad.
 * Usados por el footer del sidebar, el command palette (copiar email) y el
 * JSON-LD (sameAs). Cambiar aquí se propaga a todos.
 */
export const CONTACT = {
  email: 'contacto.danrod@gmail.com',
  whatsapp: '573012106430', // formato internacional sin '+', para wa.me/<num>
  github: 'https://github.com/dannrodd',
  linkedin: 'https://co.linkedin.com/in/danrodd',
  cv: '/cv.md'
} as const
