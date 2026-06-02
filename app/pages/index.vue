<script setup lang="ts">
import { NAV_SECTIONS } from '~/data/nav'

/**
 * Home. Por ahora apila placeholders de cada sección para validar el shell
 * y la navegación. En Fase 2+ cada placeholder se reemplaza por su componente
 * real (<AboutSection />, <ExperienceTimeline />, etc.).
 */
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-24 py-14">
    <section
      v-for="section in NAV_SECTIONS"
      :id="section.id"
      :key="section.id"
      class="scroll-mt-20"
    >
      <p class="font-mono text-sm lowercase tracking-wide text-accent">
        {{ section.num }} — {{ t(`nav.${section.id}`) }}
      </p>
      <p class="mt-3 text-sm text-muted">
        {{ t('placeholder') }}
      </p>
    </section>
  </div>
</template>
