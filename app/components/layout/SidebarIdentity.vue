<script setup lang="ts">
/**
 * Bloque de identidad del sidebar: avatar (iniciales mientras no haya foto),
 * nombre, rol y pitch. Solo presentación; los textos vienen de i18n.
 */
const { t } = useI18n()
</script>

<template>
  <div>
    <figure
      class="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[18px] bg-gradient-to-br from-accent to-[#0284c7] font-mono text-2xl font-bold text-white"
      aria-hidden="true"
    >
      DR
    </figure>

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
