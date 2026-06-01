import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content', // ADRs, casos y "now" como markdown versionable
    '@nuxt/image', // optimización de imágenes (avatar, OG)
    '@nuxt/fonts', // fuentes self-hosted (detecta familias del CSS)
    '@nuxtjs/i18n', // ES/EN con rutas (ADR-003)
    '@vueuse/nuxt', // composables: useColorMode, useMagicKeys, useClipboard…
    'nuxt-seo-utils' // og:tags, meta, canonical
    // 'shadcn-nuxt'  // requiere `npx shadcn-vue@latest init` antes de activar
  ],

  devtools: { enabled: true },

  // Universal rendering ON (HTML real para SEO). SSG/SSR es decisión de DEPLOY,
  // no de este flag: `nuxt generate` = estático, `nuxt build` = servidor Nitro.
  ssr: true,

  // v1 = SSG. Prerenderiza todo el sitio a HTML estático (incluye /en por i18n).
  // Para pasar a SSR luego: basta usar `nuxt build` y quitar/ajustar esto.
  nitro: {
    prerender: {
      crawlLinks: true, // descubre rutas siguiendo enlaces desde las semillas
      routes: ['/', '/en'], // semillas de cada idioma
      failOnError: false
    }
  },

  css: ['~/assets/css/main.css'],

  // Tailwind v4 se integra como plugin de Vite (ya no hay módulo Nuxt)
  vite: {
    plugins: [tailwindcss()],
    // pre-bundlea los íconos en dev para evitar reloads al descubrirlos en runtime
    optimizeDeps: {
      include: ['@lucide/vue']
    }
  },

  i18n: {
    defaultLocale: 'es',
    strategy: 'prefix_except_default', // ES en "/", EN en "/en"
    locales: [
      { code: 'es', language: 'es-CO', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ]
  },

  // Prerender estático del home; las rutas server se agregan luego si hacen falta
  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15'
})
