<script setup lang="ts">
import { Moon, Sun, Terminal } from '@lucide/vue'

const { t } = useI18n()

// useColorMode de VueUse: pone la clase .dark/.light en <html>
const colorMode = useColorMode()
const toggleTheme = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <main class="mx-auto max-w-3xl px-7 py-24">
    <p class="mb-4 flex items-center gap-2 font-mono text-sm text-accent">
      <Terminal :size="16" />
      <span>whoami</span>
    </p>

    <h1 class="text-5xl font-bold tracking-tight text-ink">
      Daniel Rodríguez
      <span class="ital font-normal">Solarte</span>
    </h1>

    <p class="mt-4 font-mono text-sm text-accent">{{ t('role') }}</p>
    <p class="mt-6 max-w-xl text-lg text-muted">{{ t('pitch') }}</p>

    <button
      class="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
      @click="toggleTheme"
    >
      <Sun v-if="colorMode === 'dark'" :size="15" />
      <Moon v-else :size="15" />
      <span>{{ colorMode === 'dark' ? 'light' : 'dark' }}</span>
    </button>

    <p class="mt-16 font-mono text-xs text-dim">
      esqueleto base · v0.1
    </p>
  </main>
</template>
