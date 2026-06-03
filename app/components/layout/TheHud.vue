<script setup lang="ts">
/**
 * Franja de telemetría superior.
 * Interactivo: reloj GMT-5 en vivo (cada 1s) y latencia que oscila (cada 2.4s).
 * Los valores arrancan como placeholder para que el render SSG y la hidratación
 * coincidan; recién se actualizan en cliente (onMounted), evitando mismatch.
 */
import { Search } from 'lucide-vue-next'

const { t } = useI18n()
const { toggle: toggleCmdk } = useCommandPalette()

const site = useSiteConfig()
const domain = computed(() => {
  try {
    return new URL(site.url ?? '').hostname
  } catch {
    return site.url ?? 'dannrodd.com'
  }
})

const time = ref('--:--:--')
const latency = ref('25ms')

const formatBogota = () =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Bogota'
  }).format(new Date())

const tickClock = () => {
  time.value = formatBogota()
}

const tickLatency = () => {
  // oscila ~14–27ms alrededor de 23
  const ms = Math.max(14, Math.round(23 + (Math.random() - 0.5) * 8))
  latency.value = `${ms}ms`
}

// immediate:false → no corren en servidor; se activan al montar en cliente
const clock = useIntervalFn(tickClock, 1000, { immediate: false })
const lat = useIntervalFn(tickLatency, 2400, { immediate: false })

onMounted(() => {
  tickClock()
  tickLatency()
  clock.resume()
  lat.resume()
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
          <span class="hud-dot h-1.5 w-1.5 rounded-full" />
          <span>{{ domain }}</span>
        </span>

        <span class="hidden shrink-0 text-white/50 sm:inline">·</span>
        <span class="hidden shrink-0 sm:inline">
          <span class="text-white/60">pod</span> portafolio-7d8f
        </span>

        <span class="shrink-0 text-white/50">·</span>
        <span class="hud-status inline-flex shrink-0 items-center gap-1.5">
          <span class="hud-dot h-1 w-1 rounded-full" />
          healthy
        </span>

        <span class="hidden shrink-0 text-white/50 sm:inline">·</span>
        <span class="hidden shrink-0 sm:inline">
          <span class="text-white/60">latency</span> <span class="tabular-nums">{{ latency }}</span>
        </span>

        <span class="shrink-0 text-white/50">·</span>
        <span class="shrink-0">
          <span class="text-white/60">GMT-5</span> <span class="tabular-nums">{{ time }}</span>
        </span>
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
