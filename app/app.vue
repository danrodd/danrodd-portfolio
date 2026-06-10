<script setup lang="ts">
import { CONTACT } from '~/data/contact'

const { t } = useI18n()
const site = useSiteConfig()

// i18n SEO: gestiona <html lang/dir>, los <link hreflang> alternos y og:locale
// (seo: true). Es la fuente del SEO bilingüe; por eso no fijamos lang a mano.
const i18nHead = useLocaleHead({ dir: true, lang: true, seo: true })
useHead(() => i18nHead.value)

// Resto del head: título, favicon y JSON-LD (Person) para datos estructurados.
useHead({
  titleTemplate: (titleChunk) => titleChunk ?? 'Daniel Rodríguez Solarte',
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

useSeoMeta({
  title: () => t('meta.title'),
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
