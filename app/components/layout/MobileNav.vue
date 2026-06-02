<script setup lang="ts">
import { NAV_SECTIONS } from '~/data/nav'

/**
 * Navegación móvil: pills con scroll horizontal (placeholder de Fase 0).
 * Pendiente Fase 3: estado activo sincronizado con el scroll (scroll-spy)
 * y auto-centrado de la pill activa.
 */
const { t } = useI18n()
</script>

<template>
  <nav
    class="sticky top-8 z-40 border-b border-line bg-bg/85 backdrop-blur-md lg:hidden"
    aria-label="Secciones"
  >
    <div
      class="flex gap-2 overflow-x-auto px-6 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <a
        v-for="section in NAV_SECTIONS"
        :key="section.id"
        :href="`#${section.id}`"
        class="flex-none whitespace-nowrap rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.72rem] text-muted transition-colors"
      >
        {{ section.num }} · {{ t(`nav.${section.id}`) }}
      </a>
    </div>
  </nav>
</template>
