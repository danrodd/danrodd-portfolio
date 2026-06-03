<script setup lang="ts">
/**
 * Live telemetry values for TheHud: GMT-5 clock (1s interval) and latency
 * oscillation (2.4s interval).
 *
 * Hydration-safe: both refs start as SSR-friendly placeholders and are only
 * updated client-side (onMounted), so the prerendered HTML and Vue's hydration
 * snapshot always agree — no hydration mismatch.
 */
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
  // oscillates ~14–27ms around 23
  const ms = Math.max(14, Math.round(23 + (Math.random() - 0.5) * 8))
  latency.value = `${ms}ms`
}

// immediate:false → intervals do not run on the server; activated on mount
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
  <span class="hidden shrink-0 sm:inline">
    <span class="text-white/60">latency</span>
    <span class="tabular-nums"> {{ latency }}</span>
  </span>

  <span class="shrink-0 text-white/50">·</span>

  <span class="shrink-0">
    <span class="text-white/60">GMT-5</span>
    <span class="tabular-nums"> {{ time }}</span>
  </span>
</template>
