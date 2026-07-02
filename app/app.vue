<script setup lang="ts">
import { CONTACT } from '~/data/contact'

const { t } = useI18n()
const site = useSiteConfig()

// i18n SEO: gestiona <html lang/dir>, los <link hreflang> alternos y og:locale
// (seo: true). Es la fuente del SEO bilingüe; por eso no fijamos lang a mano.
const i18nHead = useLocaleHead({ dir: true, lang: true, seo: true })
useHead(() => i18nHead.value)

// titleTemplate: child pages that set their own title get the brand appended
// ("Page · Daniel Andrés Rodríguez"). The home page sets title: null so the
// template falls back to the bare brand name — no double-branding.
useHead({
  titleTemplate: (titleChunk) => titleChunk ?? 'Daniel Andrés Rodríguez',
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    // Pista para agentes/LLMs: resumen machine-readable del perfil (convención llms.txt)
    { rel: 'alternate', type: 'text/markdown', href: '/llms.txt', title: 'llms.txt' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        url: site.url,
        jobTitle: 'Fullstack Software Developer',
        email: CONTACT.email,
        sameAs: [CONTACT.github, CONTACT.linkedin],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Neiva',
          addressCountry: 'CO'
        }
      })
    }
  ]
})

// Site-wide OG image via nuxt-og-image. The module emits og:image and
// twitter:image meta tags automatically from this definition.
// NuxtSeo template is the built-in branded template from nuxt-og-image.
defineOgImage('NuxtSeoSatori', {
  title: site.name,
  description: () => t('meta.description')
})

// Home sets title: null so titleTemplate uses the fallback (no double-brand).
// ogTitle / twitterTitle keep the full descriptive string from meta.title.
useSeoMeta({
  title: null,
  description: () => t('meta.description'),
  ogType: 'website',
  ogSiteName: site.name,
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('meta.title'),
  twitterDescription: () => t('meta.description')
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
