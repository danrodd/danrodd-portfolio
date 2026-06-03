<script setup lang="ts">
import { EXPERIENCE } from '~/data/experience'

/** 02 · Trayectoria. Línea de tiempo desde data/experience.ts (placeholder). */
const { t } = useI18n()
</script>

<template>
  <section id="experience" class="mb-[88px] scroll-mt-24">
    <SectionHeading
      :title="t('sections.experience.title')"
      :mark="t('sections.experience.mark')"
    />

    <ol class="flex flex-col">
      <li
        v-for="(exp, i) in EXPERIENCE"
        :key="i"
        class="group -mx-[22px] grid grid-cols-1 gap-2 rounded-[10px] px-[22px] py-[22px] transition-colors hover:bg-bg-soft sm:grid-cols-[110px_1fr] sm:gap-[22px]"
      >
        <div class="pt-1 font-mono text-[0.72rem] font-medium tracking-wide text-muted">
          {{ exp.current ? `${exp.period} — ${t('experience.present')}` : exp.period }}
        </div>

        <div>
          <h3 class="mb-2 text-base font-semibold leading-tight text-ink">
            {{ t(exp.roleKey) }}
            <span class="ml-1 text-ink transition-colors group-hover:text-accent">
              @ {{ exp.company }} ↗
            </span>
          </h3>
          <p class="mb-3 text-[0.92rem] leading-relaxed text-muted">{{ t(exp.descKey) }}</p>
          <ul class="flex flex-wrap gap-1.5">
            <li
              v-for="tag in exp.tags"
              :key="tag"
              class="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.68rem] font-medium text-accent-ink transition-colors group-hover:bg-accent group-hover:text-paper"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
      </li>
    </ol>

    <a
      href="/cv.pdf"
      target="_blank"
      rel="noopener"
      class="mt-6 inline-flex items-center gap-1.5 border-b border-ink pb-0.5 font-mono text-sm font-medium text-ink transition-all hover:gap-2.5 hover:border-accent hover:text-accent"
    >
      {{ t('sections.experience.cta') }} <span>↗</span>
    </a>
  </section>
</template>
