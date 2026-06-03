<script setup lang="ts">
import { STACK } from '~/data/stack'

/** 05 · Stack. Capas L1–L5 + observabilidad transversal. CONTENIDO REAL. */
const { t } = useI18n()
</script>

<template>
  <section id="stack" class="mb-[88px] scroll-mt-24">
    <SectionHeading :title="t('sections.stack.title')" :mark="t('sections.stack.mark')" />
    <p class="mb-[30px] max-w-[60ch] text-[0.95rem] leading-relaxed text-muted">
      {{ t('sections.stack.intro') }}
    </p>

    <div class="flex flex-col gap-1.5">
      <div
        class="mb-1 flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-dim"
        aria-hidden="true"
      >
        <span>{{ t('sections.stack.flow') }}</span>
        <span class="text-accent">↓</span>
      </div>

      <div
        v-for="layer in STACK"
        :key="layer.idx"
        class="grid grid-cols-1 items-center gap-3 rounded-[10px] border border-l-2 bg-paper px-[18px] py-4 transition-transform hover:translate-x-[3px] sm:grid-cols-[200px_1fr] sm:gap-[18px]"
        :class="
          layer.crosscutting
            ? 'mt-1.5 border-dashed border-line border-l-accent bg-bg-soft'
            : 'border-line border-l-accent hover:border-l-accent-bright'
        "
      >
        <div class="flex flex-wrap items-baseline gap-2.5">
          <span class="shrink-0 font-mono text-[0.72rem] font-semibold text-accent">{{ layer.idx }}</span>
          <span class="text-[0.98rem] font-semibold tracking-tight text-ink">{{ layer.name }}</span>
          <span class="w-full font-mono text-[0.68rem] text-dim">{{ t(layer.verbKey) }}</span>
        </div>

        <div class="flex flex-wrap gap-1.5 font-mono">
          <span
            v-for="tech in layer.techs"
            :key="tech"
            class="rounded-full border border-line px-2.5 py-0.5 text-[0.7rem] text-muted"
            :class="layer.crosscutting ? 'bg-paper' : 'bg-bg-soft'"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
