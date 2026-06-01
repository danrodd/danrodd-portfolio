<script setup lang="ts">
const { t, locale } = useI18n()

// lang del <html> sincronizado con i18n
useHead({
  htmlAttrs: { lang: locale }
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
  <NuxtPage />
</template>
