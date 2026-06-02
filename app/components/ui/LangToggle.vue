<script setup lang="ts">
/**
 * Toggle de idioma ES/EN.
 * Usa rutas localizadas (NuxtLink → switchLocalePath), prerenderizables y SEO-friendly,
 * en vez de cambiar el locale solo en cliente. Muestra el idioma actual.
 */
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const target = computed(() => (locale.value === 'es' ? 'en' : 'es'))
</script>

<template>
  <NuxtLink
    :to="switchLocalePath(target)"
    :aria-label="`Cambiar idioma a ${target.toUpperCase()}`"
    class="inline-flex h-8 items-center rounded-full border border-line px-3 font-mono text-[0.7rem] tracking-wide text-muted transition-colors hover:border-line-strong hover:text-ink"
  >
    {{ locale.toUpperCase() }}
  </NuxtLink>
</template>
