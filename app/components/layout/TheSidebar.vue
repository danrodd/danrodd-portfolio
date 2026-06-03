<script setup lang="ts">
/**
 * Columna izquierda del shell. Solo compone sus tres partes:
 *   <SidebarIdentity /> — avatar, nombre, rol, pitch
 *   <SidebarNav />      — diagrama de secciones (desktop) con scroll-spy
 *   <SidebarFooter />   — social + controles de idioma/tema
 */
</script>

<template>
  <aside class="flex h-full flex-col justify-between py-14">
    <SidebarIdentity />
    <SidebarNav />
    <SidebarFooter />
  </aside>
</template>
