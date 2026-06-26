<script setup lang="ts">
/**
 * Bloque de identidad del sidebar: avatar (foto), nombre, rol y pitch.
 * Solo presentación; los textos vienen de i18n.
 */
const { t } = useI18n()
</script>

<template>
  <div>
    <!-- Avatar = elemento LCP. Es un .webp estático de 144px: servirlo directo
         (sin pasar por el proxy de imágenes) lo hace descubrible en el HTML,
         permite fetchpriority=high y evita un posible mismatch de hidratación
         de @nuxt/image con provider en SSG. -->
    <img
      src="/avatar.webp"
      alt="Daniel Andrés Rodríguez"
      width="144"
      height="144"
      loading="eager"
      fetchpriority="high"
      decoding="async"
      class="mb-5 h-[144px] w-[144px] rounded-[28px] object-cover ring-1 ring-line"
    >

    <h1 class="text-[2rem] font-bold leading-none tracking-tight text-ink">
      Daniel Andrés<br>
      <span class="ital text-[1.6rem]">Rodríguez</span>
    </h1>

    <p class="mt-4 font-mono text-xs lowercase tracking-wide text-accent">
      {{ t('role') }}
    </p>

    <p class="mt-4 max-w-xs text-sm leading-relaxed text-muted">
      {{ t('pitch') }}
    </p>
  </div>
</template>
