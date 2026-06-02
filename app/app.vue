<script setup lang="ts">
const { t, locale } = useI18n()

// lang del <html> sincronizado con i18n
useHead({
  htmlAttrs: { lang: locale },
  // El título ya viene completo desde i18n: no anexar "%siteName" del módulo SEO.
  titleTemplate: (titleChunk) => titleChunk ?? 'Daniel Rodríguez Solarte',
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
})

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
