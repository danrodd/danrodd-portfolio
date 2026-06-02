<script setup lang="ts">
/**
 * Encabezado de sección: título accesible (sr-only, para lectores de pantalla)
 * + la "marca" mono de acento visible, ej. "01 — sobre mí".
 */
defineProps<{ title: string; mark: string }>()
</script>

<template>
  <h2 class="sr-only">{{ title }}</h2>
  <p class="mb-6 font-mono text-xs font-medium tracking-wide text-accent">
    {{ mark }}
  </p>
</template>
