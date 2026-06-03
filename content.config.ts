import { defineCollection, defineContentConfig, z } from '@nuxt/content'

/**
 * Colecciones de contenido en markdown (carpeta /content).
 * Bilingüe: un archivo por idioma bajo subcarpeta de locale, ej.
 *   content/cases/es/01.md  +  content/cases/en/01.md
 * Las queries filtran por `locale`. El cuerpo del .md es la prosa larga;
 * el frontmatter (validado por Zod) son los metadatos de cada documento.
 */
const locale = z.enum(['es', 'en'])

export default defineContentConfig({
  collections: {
    // content/about/{es,en}.md → prosa de "Sobre mí"
    about: defineCollection({
      type: 'page',
      source: 'about/*.md',
      schema: z.object({
        locale
      })
    }),

    // content/cases/{es,en}/*.md → casos de ingeniería (sección Trabajo)
    cases: defineCollection({
      type: 'page',
      source: 'cases/**/*.md',
      schema: z.object({
        locale,
        // `id` es reservado por @nuxt/content (clave primaria = colección/ruta),
        // así que el identificador visible va en `code`.
        code: z.string(), // "C/01"
        year: z.string(), // "20XX"
        order: z.number().default(0),
        title: z.string(),
        description: z.string(),
        impactLabel: z.string().optional(), // "Impacto:"
        impact: z.string().optional(), // "00:00 → 00:00"
        pct: z.string().optional(), // "−00%"
        stack: z.array(z.string()).default([])
      })
    }),

    // content/adrs/{es,en}/*.md → decisiones arquitectónicas (sección Decisiones)
    adrs: defineCollection({
      type: 'page',
      source: 'adrs/**/*.md',
      schema: z.object({
        locale,
        // `id` es reservado por @nuxt/content; el identificador visible va en `code`.
        code: z.string(), // "ADR-001"
        order: z.number().default(0),
        title: z.string(),
        status: z.enum(['accepted', 'proposed', 'draft']).default('draft'),
        date: z.string() // "20XX · 00"
      })
    })
  }
})
