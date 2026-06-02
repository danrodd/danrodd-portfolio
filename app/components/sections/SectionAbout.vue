<script setup lang="ts">
/** 01 · Sobre mí. Prosa desde content/about/{locale}.md (markdown bilingüe). */
const { t, locale } = useI18n()

const { data: about } = await useAsyncData(`about-${locale.value}`, () =>
  queryCollection('about').where('locale', '=', locale.value).first()
)
</script>

<template>
  <section id="about" class="mb-[88px] scroll-mt-24">
    <SectionHeading :title="t('sections.about.title')" :mark="t('sections.about.mark')" />

    <ContentRenderer v-if="about" :value="about" class="about-prose max-w-[60ch]" />
  </section>
</template>

<style scoped>
/* Estilos de prosa para el markdown renderizado (no usamos plugin de tipografía). */
.about-prose :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
  color: var(--ink-soft);
}
.about-prose :deep(p:first-child) {
  font-size: 1.04rem;
  color: var(--ink);
}
.about-prose :deep(p:last-child) {
  margin-bottom: 0;
}
.about-prose :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.about-prose :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--bg-soft);
  padding: 1px 5px;
  border-radius: 4px;
}
.about-prose :deep(em) {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--accent);
}
</style>
