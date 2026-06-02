<script setup lang="ts">
/**
 * Shell del sitio: HUD (telemetría) + nav móvil + grid de 2 columnas
 * (sidebar sticky | contenido). Las páginas se inyectan en el <slot />.
 */
</script>

<template>
  <div class="min-h-screen bg-bg text-ink">
    <!-- Accesibilidad: salto al contenido -->
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
    >
      Saltar al contenido
    </a>

    <TheHud />
    <MobileNav />

    <div class="mx-auto grid max-w-[1240px] gap-12 px-7 lg:grid-cols-[320px_1fr] lg:gap-20">
      <TheSidebar class="lg:sticky lg:top-8 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto" />

      <main id="main" class="min-w-0">
        <slot />
      </main>
    </div>
  </div>
</template>
