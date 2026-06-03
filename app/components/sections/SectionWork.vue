<script setup lang="ts">
/**
 * 03 · Trabajo seleccionado. Tarjetas de caso desde content/cases/{locale}/*.md.
 * El título es un botón que despliega un drawer con el cuerpo del .md (prosa).
 * Las visualizaciones bespoke del v6 llegarán con el contenido real.
 */
const { t, locale } = useI18n()

const { data: cases } = await useAsyncData(`cases-${locale.value}`, () =>
  queryCollection('cases').where('locale', '=', locale.value).order('order', 'ASC').all()
)

// Acordeón de un solo caso abierto a la vez (null = todos cerrados).
const open = ref<string | null>(null)
const toggle = (code: string) => {
  open.value = open.value === code ? null : code
}
// id válido para aria-controls (sin "/").
const drawerId = (code: string) => `case-${code.replace('/', '-')}`
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
        class="-mx-[22px] grid grid-cols-1 gap-2 rounded-[10px] px-[22px] py-[22px] transition-colors hover:bg-bg-soft sm:grid-cols-[110px_1fr] sm:gap-[22px]"
      >
        <div class="flex flex-col gap-1 pt-1 font-mono">
          <span class="text-[0.72rem] font-medium tracking-wide text-muted">{{ c.year }}</span>
          <span class="text-[0.68rem] text-dim">{{ c.code }}</span>
        </div>

        <div>
          <h3 class="mb-2 text-base font-semibold leading-tight">
            <button
              type="button"
              :aria-expanded="open === c.code"
              :aria-controls="drawerId(c.code)"
              class="group/btn inline-flex cursor-pointer items-baseline gap-2 text-left text-ink transition-colors hover:text-accent"
              @click="toggle(c.code)"
            >
              <span>{{ c.title }}</span>
              <span
                class="text-[0.8em] text-dim transition-transform group-hover/btn:text-accent"
                :class="{ 'rotate-180': open === c.code }"
                aria-hidden="true"
              >
                ↓
              </span>
            </button>
          </h3>

          <p class="mb-3 text-[0.92rem] leading-relaxed text-muted">{{ c.description }}</p>

          <p v-if="c.impact" class="mb-3 flex flex-wrap items-center gap-2 font-mono text-[0.76rem]">
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
              class="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.68rem] font-medium text-accent"
            >
              {{ tech }}
            </li>
          </ul>
        </div>

        <!-- Drawer: cuerpo del caso (markdown). Ocupa el ancho completo de la fila. -->
        <Transition name="drawer">
          <div
            v-if="open === c.code"
            :id="drawerId(c.code)"
            class="case-prose col-span-full mt-2 rounded-[10px] border border-line bg-paper p-5 text-sm"
          >
            <ContentRenderer :value="c" />
          </div>
        </Transition>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition:
    opacity 200ms ease,
    transform 200ms ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Prosa del cuerpo del caso renderizado desde markdown. */
.case-prose :deep(p) {
  line-height: 1.7;
  color: var(--ink-soft);
}
.case-prose :deep(p + p) {
  margin-top: 0.75rem;
}
.case-prose :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--bg-soft);
  padding: 1px 5px;
  border-radius: 4px;
}
.case-prose :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
