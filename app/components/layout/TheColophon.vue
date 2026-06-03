<script setup lang="ts">
/**
 * Pie de página del contenido: colofón + mini changelog + "endpoints" curl.
 * Los endpoints son aspiracionales (placeholder); el changelog refleja hitos
 * del propio sitio. Fecha/versión son placeholder hasta el deploy real.
 */
const { t } = useI18n()
const config = useRuntimeConfig()
const appVersion = computed(() => `v${config.public.appVersion}`)

const site = useSiteConfig()
const domain = computed(() => {
  try {
    return new URL(site.url ?? '').hostname
  } catch {
    return site.url ?? 'dannrodd.com'
  }
})

const changes = [
  { date: '2026-06-02', textKey: 'colophon.changes.c1' },
  { date: '2026-06-01', textKey: 'colophon.changes.c2' },
  { date: '2026-06-01', textKey: 'colophon.changes.c3' }
]

// Salidas language-neutral (no necesitan traducción).
const endpoints = computed(() => [
  { cmd: `curl ${domain.value}/cv`, out: '→ cv.md' },
  { cmd: `curl ${domain.value}/now`, out: '→ status.json' },
  { cmd: `curl ${domain.value}/adrs`, out: '→ adrs.json' }
])
</script>

<template>
  <footer class="mt-20 border-t border-line pt-7 text-muted">
    <p class="mb-7 max-w-[60ch] font-mono text-[0.78rem] leading-[1.7]">
      {{ t('colophon.text') }}
    </p>

    <div class="grid grid-cols-1 gap-8 border-y border-line py-6 sm:grid-cols-2">
      <!-- mini changelog -->
      <div>
        <p class="mb-3.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-dim">
          {{ t('colophon.changelogHead') }}
        </p>
        <ol class="flex flex-col gap-2">
          <li
            v-for="ch in changes"
            :key="ch.textKey"
            class="grid grid-cols-[90px_1fr] items-baseline gap-3 text-[0.78rem]"
          >
            <span class="font-mono font-medium text-accent">{{ ch.date }}</span>
            <span class="leading-snug text-ink-soft">{{ t(ch.textKey) }}</span>
          </li>
        </ol>
      </div>

      <!-- endpoints curl -->
      <div>
        <p class="mb-3.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-dim">
          {{ t('colophon.endpointsHead') }}
        </p>
        <ul class="flex flex-col gap-2 font-mono">
          <li
            v-for="ep in endpoints"
            :key="ep.cmd"
            class="flex flex-wrap items-baseline gap-2.5 text-[0.74rem]"
          >
            <span class="font-medium text-ink before:text-accent before:content-['$_']">
              {{ ep.cmd }}
            </span>
            <span class="text-[0.72rem] text-muted">{{ ep.out }}</span>
          </li>
        </ul>
      </div>
    </div>

    <p class="mt-[18px] flex flex-wrap items-center gap-3 font-mono text-[0.74rem] text-dim">
      <span>{{ t('colophon.lastUpdated') }} · <span class="text-ink-soft">—</span></span>
      <span>·</span>
      <span>{{ appVersion }}</span>
      <span>·</span>
      <span>{{ t('colophon.madeWith') }} ♥ {{ t('colophon.from') }}</span>
    </p>
  </footer>
</template>
