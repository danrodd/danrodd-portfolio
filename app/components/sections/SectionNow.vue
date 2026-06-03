<script setup lang="ts">
import { NOW } from '~/data/now'

/**
 * 06 · Ahora. Dashboard oscuro (colores fijos, no reacciona al tema — es un
 * "panel de estado" deliberadamente dark). Valores placeholder en data/now.ts.
 */
const { t } = useI18n()

// Pod name constant — keep in sync with TheHud.vue pod label.
// "live" / "served from pod" are intentionally English terminal-flavored labels
// (language-neutral by design; not subject to i18n).
const POD_NAME = 'portafolio-dev'
</script>

<template>
  <section id="now" class="mb-[56px] scroll-mt-24">
    <SectionHeading :title="t('sections.now.title')" :mark="t('sections.now.mark')" />
    <p class="mb-[30px] max-w-[60ch] text-[0.95rem] leading-relaxed text-muted">
      {{ t('sections.now.intro') }}
    </p>

    <DarkCard class="p-[22px]">
      <div class="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <span class="font-mono text-[0.8rem] font-medium text-[#e8eae5]">daniel.live · status</span>
        <span class="flex items-center gap-1.5 font-mono text-[0.7rem] text-[#34d399]">
          <span class="h-1.5 w-1.5 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" /> live
        </span>
      </div>

      <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <article
          v-for="(item, i) in NOW"
          :key="item.labelKey"
          class="flex flex-col gap-1 rounded-xl border border-white/[0.06] bg-white/[0.035] p-4 transition-colors hover:border-[#34d399]/30 hover:bg-white/[0.06]"
          :class="i === NOW.length - 1 && 'sm:col-span-2'"
        >
          <span
            class="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-[#34d399]"
          >
            {{ t(item.labelKey) }}
          </span>
          <span class="mt-0.5 text-[1.02rem] font-medium tracking-tight text-[#f0f2ed]">
            {{ t(item.valueKey) }}
          </span>
          <span v-if="item.metaKey" class="font-mono text-[0.7rem] text-[#f0f2ed]/60">
            {{ t(item.metaKey) }}
          </span>
        </article>
      </div>

      <div
        class="mt-4 flex items-center justify-between border-t border-white/10 pt-3.5 font-mono text-[0.7rem] text-[#f0f2ed]/60"
      >
        <span class="flex items-center gap-1.5">
          <span class="h-[5px] w-[5px] rounded-full bg-[#34d399]" /> served from pod
          <strong class="font-medium text-[#f0f2ed]">{{ POD_NAME }}</strong>
        </span>
        <span>—</span>
      </div>
    </DarkCard>
  </section>
</template>
