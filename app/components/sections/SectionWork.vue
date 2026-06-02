<script setup lang="ts">
/**
 * 03 · Trabajo seleccionado. Tarjetas de caso desde content/cases/{locale}/*.md.
 * Aquí solo se usa el frontmatter (id, título, impacto, stack); el cuerpo del .md
 * alimentará el drawer/detalle en una fase posterior.
 */
const { t, locale } = useI18n()

const { data: cases } = await useAsyncData(`cases-${locale.value}`, () =>
  queryCollection('cases').where('locale', '=', locale.value).order('order', 'ASC').all()
)
</script>

<template>
  <section id="work" class="mb-[88px] scroll-mt-24">
    <SectionHeading :title="t('sections.work.title')" :mark="t('sections.work.mark')" />
    <p class="mb-[30px] max-w-[60ch] text-[0.95rem] leading-relaxed text-muted">
      {{ t('sections.work.intro') }}
    </p>

    <ol class="flex flex-col">
      <li
        v-for="c in cases"
        :key="c.code"
        class="group -mx-[22px] grid grid-cols-1 gap-2 rounded-[10px] px-[22px] py-[22px] transition-colors hover:bg-bg-soft sm:grid-cols-[110px_1fr] sm:gap-[22px]"
      >
        <div class="flex flex-col gap-1 pt-1 font-mono">
          <span class="text-[0.72rem] font-medium tracking-wide text-muted">{{ c.year }}</span>
          <span class="text-[0.68rem] text-dim">{{ c.code }}</span>
        </div>

        <div>
          <h3
            class="mb-2 text-base font-semibold leading-tight text-ink transition-colors group-hover:text-accent"
          >
            {{ c.title }}
          </h3>
          <p class="mb-3 text-[0.92rem] leading-relaxed text-muted">{{ c.description }}</p>

          <p
            v-if="c.impact"
            class="mb-3 flex flex-wrap items-center gap-2 font-mono text-[0.76rem]"
          >
            <span class="text-muted">{{ c.impactLabel }}</span>
            <span class="font-semibold text-accent">{{ c.impact }}</span>
            <template v-if="c.pct">
              <span class="text-dim">·</span>
              <span class="rounded-full bg-accent px-2 py-0.5 text-[0.7rem] font-bold text-paper">
                {{ c.pct }}
              </span>
            </template>
          </p>

          <ul class="flex flex-wrap gap-1.5">
            <li
              v-for="tech in c.stack"
              :key="tech"
              class="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.68rem] font-medium text-accent transition-colors group-hover:bg-accent group-hover:text-paper"
            >
              {{ tech }}
            </li>
          </ul>
        </div>
      </li>
    </ol>
  </section>
</template>
