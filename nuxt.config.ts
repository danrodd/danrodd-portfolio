import tailwindcss from '@tailwindcss/vite'
import pkg from './package.json' with { type: 'json' }

const { version } = pkg

// Prefijo de marca para todo lo que el sitio persista en el navegador
// (localStorage y cookies). Mantiene el storage ordenado e identificable al
// abrir devtools. Convención: `dannrodd-<clave>`. Se usa `-` (no `:`) porque es
// válido tanto en localStorage como en nombres de cookie (el `:` no es estándar
// en cookies), así todas las claves comparten el mismo separador.
const STORAGE_PREFIX = 'dannrodd'

// URL canónica del sitio. Fuente única para site config (canonical/OG),
// hreflang de i18n y el sitemap. Cambiar aquí al dominio definitivo.
const SITE_URL = 'https://dannrodd.com'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content', // ADRs, casos y "now" como markdown versionable
    '@nuxt/image', // optimización de imágenes (avatar, OG)
    '@nuxt/fonts', // fuentes self-hosted (detecta familias del CSS)
    '@nuxtjs/i18n', // ES/EN con rutas (ADR-003)
    '@vueuse/nuxt', // composables: useIntervalFn, useMagicKeys, useClipboard…
    'nuxt-seo-utils', // og:tags, meta, canonical
    'nuxt-og-image', // og:image generation — reads site.url for absolute URLs
    '@nuxtjs/sitemap', // sitemap.xml automático (con hreflang por i18n)
    '@nuxtjs/color-mode' // modo claro/oscuro sin flash en SSG (ADR del sitio)
    // 'shadcn-nuxt'  // requiere `npx shadcn-vue@latest init` antes de activar
  ],

  // Modo de color: el módulo inyecta su script anti-flash en <head> antes del
  // primer pintado. classSuffix '' → clase `.dark`/`.light` en <html>, que es
  // lo que espera nuestro @custom-variant dark en main.css.
  colorMode: {
    classSuffix: '',
    preference: 'system', // respeta prefers-color-scheme por defecto
    fallback: 'light',
    storageKey: `${STORAGE_PREFIX}-theme` // localStorage → 'dannrodd-theme'
  },

  devtools: { enabled: true },

  // Componentes auto-importados por nombre de archivo (sin prefijo de carpeta):
  // components/layout/TheHud.vue → <TheHud />, no <LayoutTheHud />.
  components: [{ path: '~/components', pathPrefix: false }],

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
      include: ['lucide-vue-next']
    }
  },

  i18n: {
    defaultLocale: 'es',
    baseUrl: SITE_URL, // necesario para hreflang absolutos y canonical por idioma
    strategy: 'prefix_except_default', // ES en "/", EN en "/en"
    locales: [
      { code: 'es', language: 'es-CO', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    // Misma convención de prefijo que el theme: cookie 'dannrodd-lang' en vez
    // del 'i18n_redirected' por defecto.
    detectBrowserLanguage: {
      cookieKey: `${STORAGE_PREFIX}-lang`,
      redirectOn: 'root'
    }
  },

  // Prerender estático del home; las rutas server se agregan luego si hacen falta
  routeRules: {
    '/': { prerender: true }
  },

  // Config de sitio (nuxt-site-config, usada por nuxt-seo-utils para canonical/OG
  // y por @nuxtjs/sitemap).
  site: {
    name: 'Daniel Rodríguez Solarte',
    url: SITE_URL,
    defaultLocale: 'es'
  },

  runtimeConfig: {
    public: {
      appVersion: version
    }
  },

  compatibilityDate: '2025-01-15'
})
