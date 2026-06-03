<script setup lang="ts">
/** 04 · Decisiones públicas. Lista de ADRs desde content/adrs/{locale}/*.md. */
const { t, locale } = useI18n()

const { data: adrs } = await useAsyncData(`adrs-${locale.value}`, () =>
  queryCollection('adrs').where('locale', '=', locale.value).order('order', 'ASC').all()
)
</script>

<template>
  <section id="decisions" class="mb-[88px] scroll-mt-24">
    <SectionHeading
      :title="t('sections.decisions.title')"
      :mark="t('sections.decisions.mark')"
    />
    <p class="mb-[30px] max-w-[60ch] text-[0.95rem] leading-relaxed text-muted">
      {{ t('sections.decisions.intro') }}
    </p>

    <ol class="-mx-[14px] flex flex-col">
      <li v-for="adr in adrs" :key="adr.code" class="border-b border-line last:border-none">
        <!-- href="#" provisional: las páginas de detalle de ADR llegan en una fase posterior -->
        <a
          href="#"
          class="group grid grid-cols-1 items-baseline gap-1 rounded-md p-[14px] transition-colors hover:bg-bg-soft sm:grid-cols-[72px_1fr_auto] sm:gap-[18px]"
        >
          <span class="font-mono text-[0.72rem] font-medium tracking-wide text-dim">
            {{ adr.date }}
          </span>
          <span class="text-[0.94rem] font-medium text-ink transition-colors group-hover:text-accent">
            {{ adr.title }}
          </span>
          <span
            class="justify-self-start rounded-full bg-bg-soft px-2 py-0.5 font-mono text-[0.68rem] text-muted transition-colors group-hover:bg-accent-soft group-hover:text-accent sm:justify-self-auto"
          >
            {{ adr.code }}
          </span>
        </a>
      </li>
    </ol>
  </section>
</template>
