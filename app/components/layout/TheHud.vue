<script setup lang="ts">
/**
 * Franja de telemetría superior.
 * Los valores de reloj y latencia viven en <HudTelemetry /> para que solo ese
 * subárbol se re-renderice en cada tick (cada 1s / 2.4s). TheHud solo contiene
 * el contenido estático: dominio, pod, estado y el disparador del command palette.
 */
import { Search } from 'lucide-vue-next'

const { t } = useI18n()
const { toggle: toggleCmdk } = useCommandPalette()

const site = useSiteConfig()
const domain = computed(() => {
  try {
    return new URL(site.url ?? '').hostname
  } catch {
    return site.url ?? 'danrodd.dev'
  }
})
</script>

<template>
  <div
    class="hud sticky top-0 z-50 flex h-8 items-center border-b border-white/5 bg-[#0a0a0a] font-mono text-[0.66rem] text-[#e5e5e0] sm:text-[0.7rem]"
  >
    <div
      class="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-2 px-5 sm:gap-3 sm:px-7"
    >
      <!-- Grupo de telemetría: min-w-0 + overflow-hidden para recortar antes que superponer -->
      <div class="flex min-w-0 items-center gap-2 overflow-hidden sm:gap-3">
        <span class="inline-flex shrink-0 items-center gap-2">
          <span class="h-1.5 w-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
          <span>{{ domain }}</span>
        </span>

        <span class="shrink-0 text-white/50">·</span>
        <span class="hud-status inline-flex shrink-0 items-center gap-1.5">
          <span class="hud-dot h-1 w-1 rounded-full" />
          healthy
        </span>

        <span class="hidden shrink-0 text-white/50 sm:inline">·</span>

        <!-- Live clock + latency isolated in child component so only that
             subtree re-renders on each tick. Hydration-safe: renders
             placeholder values (--:--:--, 25ms) during SSR/prerender. -->
        <HudTelemetry />
      </div>

      <!-- Disparador del command palette, con aspecto de buscador para que se
           entienda su función (también se abre con ⌘/Ctrl+K). En móvil, solo la lupa. -->
      <button
        type="button"
        :aria-label="t('cmdk.placeholder')"
        class="hud-trigger inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-white/10 px-2 py-0.5 text-white/70 transition-colors hover:text-white"
        @click="toggleCmdk"
      >
        <Search :size="12" class="shrink-0" />
        <span class="hidden sm:inline">{{ t('cmdk.search') }}</span>
        <kbd class="hidden items-center rounded border border-white/15 px-1 text-[0.6rem] sm:inline-flex">
          <span class="text-[0.85em]">⌘</span>K
        </kbd>
      </button>
    </div>
  </div>
</template>

<style scoped>
/*
  The HUD is intentionally always-dark (bg #0a0a0a).
  We pin the accent to the dark-theme value of --accent-bright (#10b981)
  so the green indicator never inverts when the user switches to light mode.
*/
.hud {
  --hud-accent: #10b981;
}

.hud-dot {
  background-color: var(--hud-accent);
  box-shadow: 0 0 8px var(--hud-accent);
}

.hud-status {
  color: var(--hud-accent);
}

.hud-trigger:hover {
  border-color: var(--hud-accent);
}
</style>
