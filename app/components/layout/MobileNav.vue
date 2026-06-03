<script setup lang="ts">
import { NAV_SECTIONS } from '~/data/nav'

/**
 * Navegación móvil: pills con scroll horizontal + scroll-spy.
 * Resalta la sección visible (useActiveSection, el mismo composable del diagrama)
 * y auto-centra la pill activa dentro del track al cambiar de sección.
 */
const { t } = useI18n()
const { active } = useActiveSection(NAV_SECTIONS.map((s) => s.id))

const track = ref<HTMLElement | null>(null)

// Centra la pill activa en el track horizontal, solo si no está completamente visible
// (así no pelea con el scroll manual del usuario).
watch(active, async (id) => {
  await nextTick()
  const el = track.value?.querySelector<HTMLElement>(`[data-id="${id}"]`)
  if (!el || !track.value) return
  const t = track.value
  const a = el.getBoundingClientRect()
  const r = t.getBoundingClientRect()
  const fullyVisible = a.left >= r.left + 12 && a.right <= r.right - 12
  if (fullyVisible) return
  t.scrollTo({
    left: t.scrollLeft + (a.left - r.left) - (r.width / 2 - a.width / 2),
    behavior: 'smooth'
  })
})
</script>

<template>
  <nav
    class="sticky top-8 z-40 border-b border-line bg-bg/85 backdrop-blur-md lg:hidden"
    aria-label="Secciones"
  >
    <div
      ref="track"
      class="flex gap-2 overflow-x-auto px-6 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <button
        v-for="section in NAV_SECTIONS"
        :key="section.id"
        :data-id="section.id"
        type="button"
        :aria-current="active === section.id ? 'location' : undefined"
        class="flex-none cursor-pointer whitespace-nowrap rounded-full border px-3.5 py-1.5 font-mono text-[0.72rem] transition-colors"
        :class="
          active === section.id
            ? 'border-accent bg-accent-soft text-accent-ink'
            : 'border-line text-muted hover:border-line-strong hover:text-ink'
        "
        @click="scrollToSection(section.id)"
      >
        {{ section.num }} · {{ t(`nav.${section.id}`) }}
      </button>
    </div>
  </nav>
</template>
