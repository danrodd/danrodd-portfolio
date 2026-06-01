import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Colecciones de contenido en markdown (carpeta /content).
// Cada caso y cada ADR es un archivo .md versionable en git.
export default defineContentConfig({
  collections: {
    // /content/cases/*.md  → casos de ingeniería
    cases: defineCollection({
      type: 'page',
      source: 'cases/*.md',
      schema: z.object({
        id: z.string(), // C/01
        year: z.string(), // "2024"
        order: z.number().default(0),
        stack: z.array(z.string()).default([]),
        impact: z.string().optional() // "10:23 → 00:47 · −92%"
      })
    }),

    // /content/adrs/*.md  → decisiones arquitectónicas
    adrs: defineCollection({
      type: 'page',
      source: 'adrs/*.md',
      schema: z.object({
        id: z.string(), // ADR-001
        status: z.enum(['accepted', 'proposed', 'draft']),
        date: z.string()
      })
    })
  }
})
