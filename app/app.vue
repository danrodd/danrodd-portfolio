<script setup lang="ts">
const { t } = useI18n()
const site = useSiteConfig()

// i18n SEO: gestiona <html lang/dir>, los <link hreflang> alternos y og:locale
// (seo: true). Es la fuente del SEO bilingüe; por eso no fijamos lang a mano.
const i18nHead = useLocaleHead({ dir: true, lang: true, seo: true })
useHead(() => i18nHead.value)

// Resto del head: título, favicon y JSON-LD (Person) para datos estructurados.
useHead({
  titleTemplate: (titleChunk) => titleChunk ?? 'Daniel Rodríguez Solarte',
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        url: site.url,
        jobTitle: 'Software Architect · DevSecOps · Tech Lead',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bogotá',
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
