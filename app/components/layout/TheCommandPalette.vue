<script setup lang="ts">
import { NAV_SECTIONS } from '~/data/nav'
import { SITE_CONTACT } from '~/data/site'

/**
 * Command palette (⌘K): modal de búsqueda de acciones.
 * - Atajo global ⌘/Ctrl+K para abrir/cerrar (onKeyStroke).
 * - Lista filtrable de comandos: ir a sección, cambiar tema/idioma, copiar email, CV.
 * - Navegable con ↑/↓/Enter; Esc cierra. Accesible (role dialog, foco al abrir).
 */
const { isOpen, close, toggle } = useCommandPalette()
const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const colorMode = useColorMode()
const { copy } = useClipboard()

interface Command {
  id: string
  label: string
  action: () => void
}

const commands = computed<Command[]>(() => [
  ...NAV_SECTIONS.map((s) => ({
    id: `go-${s.id}`,
    label: `${s.num} · ${t(`nav.${s.id}`)}`,
    action: () => scrollToSection(s.id)
  })),
  {
    id: 'theme',
    label: t('cmdk.toggleTheme'),
    action: () => {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  },
  {
    id: 'lang',
    label: t('cmdk.switchLang'),
    action: () => navigateTo(switchLocalePath(locale.value === 'es' ? 'en' : 'es'))
  },
  { id: 'email', label: t('cmdk.copyEmail'), action: () => copy(SITE_CONTACT.email) },
  { id: 'cv', label: t('cmdk.downloadCv'), action: () => window.open('/cv.pdf', '_blank') }
])

const query = ref('')
const selected = ref(0)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? commands.value.filter((c) => c.label.toLowerCase().includes(q)) : commands.value
})

// Reinicia la selección cuando cambia el filtro para no quedar fuera de rango.
watch(filtered, () => {
  selected.value = 0
})

const move = (delta: number) => {
  const n = filtered.value.length
  if (n) selected.value = (selected.value + delta + n) % n
}

const run = (cmd: Command) => {
  cmd.action()
  close()
}

const runSelected = () => {
  const cmd = filtered.value[selected.value]
  if (cmd) run(cmd)
}

// Atajo global ⌘/Ctrl+K (preventDefault para ganarle al buscador del navegador).
onKeyStroke('k', (e) => {
  if (e.metaKey || e.ctrlKey) {
    e.preventDefault()
    toggle()
  }
})

// Al abrir: limpia la búsqueda, resetea selección y enfoca el input.
const inputEl = ref<HTMLInputElement | null>(null)
watch(isOpen, async (value) => {
  if (!value) return
  query.value = ''
  selected.value = 0
  await nextTick()
  inputEl.value?.focus()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="cmdk" :duration="240">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[200] flex items-start justify-center px-4"
      >
        <!-- Fondo -->
        <div class="cmdk-backdrop absolute inset-0" @click="close" />

        <!-- Panel -->
        <div
          role="dialog"
          aria-modal="true"
          :aria-label="t('cmdk.title')"
          class="cmdk-panel relative mt-[12vh] w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl"
        >
          <!-- Input -->
          <div class="flex items-center gap-3 border-b border-line px-4 py-3">
            <span class="font-mono text-accent" aria-hidden="true">›</span>
            <input
              ref="inputEl"
              v-model="query"
              type="text"
              autocomplete="off"
              spellcheck="false"
              :placeholder="t('cmdk.placeholder')"
              :aria-label="t('cmdk.placeholder')"
              class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-dim"
              @keydown.down.prevent="move(1)"
              @keydown.up.prevent="move(-1)"
              @keydown.enter.prevent="runSelected"
              @keydown.esc="close"
            >
            <kbd
              class="rounded border border-line px-1.5 py-0.5 font-mono text-[0.6rem] text-dim"
            >
              esc
            </kbd>
          </div>

          <!-- Lista -->
          <ul role="listbox" class="max-h-[50vh] overflow-y-auto p-2">
            <li
              v-for="(cmd, i) in filtered"
              :key="cmd.id"
              role="option"
              :aria-selected="i === selected"
              class="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors"
              :class="i === selected ? 'bg-accent-soft text-accent-ink' : 'text-ink-soft'"
              @click="run(cmd)"
              @mouseenter="selected = i"
            >
              {{ cmd.label }}
            </li>
            <li v-if="!filtered.length" class="px-3 py-6 text-center text-sm text-dim">
              {{ t('cmdk.empty') }}
            </li>
          </ul>

          <!-- Pie -->
          <div
            class="flex items-center gap-4 border-t border-line px-4 py-2 font-mono text-[0.62rem] text-dim"
          >
            <span>↑↓ {{ t('cmdk.navigate') }}</span>
            <span>↵ {{ t('cmdk.run') }}</span>
            <span>esc {{ t('cmdk.close') }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Fondo: animamos opacidad Y desenfoque juntos para que el blur "entre"
   gradualmente en vez de aplicarse de golpe. */
.cmdk-backdrop {
  background: rgb(0 0 0 / 0.5);
  backdrop-filter: blur(6px);
  transition:
    opacity 240ms ease,
    backdrop-filter 240ms ease;
}
/* Panel: fade + leve descenso con curva suave. */
.cmdk-panel {
  transition:
    opacity 200ms ease,
    transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Vue pone estas clases en el contenedor raíz; apuntamos a los hijos. */
.cmdk-enter-from .cmdk-backdrop,
.cmdk-leave-to .cmdk-backdrop {
  opacity: 0;
  backdrop-filter: blur(0);
}
.cmdk-enter-from .cmdk-panel,
.cmdk-leave-to .cmdk-panel {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

/* Respeta a quien prefiere menos movimiento. */
@media (prefers-reduced-motion: reduce) {
  .cmdk-backdrop,
  .cmdk-panel {
    transition-duration: 0ms;
  }
}
</style>
