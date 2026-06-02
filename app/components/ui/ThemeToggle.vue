<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

/**
 * Toggle de tema claro/oscuro con @nuxtjs/color-mode.
 * `useColorMode()` (composable del módulo) expone `preference` (lo que elige el
 * usuario: 'light'|'dark'|'system') y `value` (el color ya resuelto). El módulo
 * inyecta el script anti-flash en <head>, así que no hace falta nada extra para
 * evitar el parpadeo en la primera carga SSG.
 */
const colorMode = useColorMode()

const toggle = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
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
      <Sun v-if="colorMode.value === 'dark'" :size="14" />
      <Moon v-else :size="14" />
      <template #fallback>
        <Moon :size="14" />
      </template>
    </ClientOnly>
  </button>
</template>
