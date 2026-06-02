<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

/**
 * Toggle de tema claro/oscuro.
 * Interim con `useColorMode` (VueUse): pone la clase .dark en <html>.
 * NOTA: el flash de tema en la primera carga SSG es justo lo que resolverá
 * el A/B del color-mode (ver docs/ROADMAP.md → Decisiones pendientes).
 */
const colorMode = useColorMode()

const toggle = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    aria-label="Cambiar tema"
    class="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
    @click="toggle"
  >
    <ClientOnly>
      <Sun v-if="colorMode === 'dark'" :size="14" />
      <Moon v-else :size="14" />
      <template #fallback>
        <Moon :size="14" />
      </template>
    </ClientOnly>
  </button>
</template>
