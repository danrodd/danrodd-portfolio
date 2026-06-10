<script setup lang="ts">
import { NOW } from '~/data/now'

/**
 * 06 · Ahora. Dashboard oscuro (colores fijos, no reacciona al tema — es un
 * "panel de estado" deliberadamente dark). Valores placeholder en data/now.ts.
 */
const { t } = useI18n()
</script>

<template>
  <section id="now" class="mb-[56px] scroll-mt-24">
    <SectionHeading :title="t('sections.now.title')" :mark="t('sections.now.mark')" />
    <p class="mb-[30px] max-w-[60ch] text-[0.95rem] leading-relaxed text-muted">
      {{ t('sections.now.intro') }}
    </p>

    <div
      class="relative overflow-hidden rounded-2xl border border-[#1c241c] bg-[#0c100c] p-[22px] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]"
    >
      <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <article
          v-for="(item, i) in NOW"
          :key="i"
          class="flex flex-col gap-1 rounded-xl border border-white/[0.06] bg-white/[0.035] p-4 transition-colors hover:border-[#34d399]/30 hover:bg-white/[0.06]"
          :class="i === NOW.length - 1 && 'sm:col-span-2'"
        >
          <span
            class="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-[#34d399]"
          >
            {{ t(item.labelKey) }}
          </span>
          <span class="mt-0.5 text-[1.02rem] font-medium tracking-tight text-[#f0f2ed]">
            {{ item.value }}
          </span>
          <span v-if="item.metaKey" class="font-mono text-[0.7rem] text-[#f0f2ed]/60">
            {{ item.metaKey ? t(item.metaKey) : '' }}
          </span>
        </article>
      </div>

    </div>
  </section>
</template>
