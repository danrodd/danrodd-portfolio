<script setup lang="ts">
/**
 * Pie de página del contenido: "endpoints" curl (motivo CLI del sitio) + metadatos.
 */
const { t } = useI18n()

// Endpoint funcional y verificable: apunta directo a /cv.md (el archivo real),
// así funciona en local, preview y producción sin depender del rewrite de Netlify.
// Las rutas machine-readable /now.json y /adrs.json se descubren vía /llms.txt.
const endpoints = [{ cmd: 'curl dannrodd.com/cv.md', out: '→ markdown', href: '/cv.md' }]
</script>

<template>
  <footer class="mt-20 border-t border-line pt-7 text-muted">
    <!-- endpoints curl -->
    <div class="border-b border-line pb-6">
      <p class="mb-3.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] text-dim">
        {{ t('colophon.endpointsHead') }}
      </p>
      <ul class="flex flex-col gap-2 font-mono">
        <li
          v-for="ep in endpoints"
          :key="ep.cmd"
          class="flex flex-wrap items-baseline gap-2.5 text-[0.74rem]"
        >
          <a
            :href="ep.href"
            target="_blank"
            rel="noopener"
            class="font-medium text-ink transition-colors before:text-accent before:content-['$_'] hover:text-accent"
          >
            {{ ep.cmd }}
          </a>
          <span class="text-[0.72rem] text-muted">{{ ep.out }}</span>
        </li>
      </ul>
    </div>

    <p class="mt-[18px] flex flex-wrap items-center gap-3 font-mono text-[0.74rem] text-dim">
      <span>{{ t('colophon.lastUpdated') }} · <span class="text-ink-soft">—</span></span>
      <span>·</span>
      <span>{{ t('colophon.madeWith') }} ♥ {{ t('colophon.from') }}</span>
    </p>
  </footer>
</template>
