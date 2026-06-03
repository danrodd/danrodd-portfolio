<script setup lang="ts">
import { NAV_SECTIONS } from '~/data/nav'

/**
 * Página de error (Nuxt la usa para 404 y otros). En SSG se sirve como fallback
 * que hidrata en cliente. Autocontenida y on-brand: tarjeta oscura estilo
 * "respuesta HTTP" + invitación a volver + accesos directos a secciones.
 */
const props = defineProps<{ error: { statusCode?: number } }>()
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const code = computed(() => props.error?.statusCode ?? 500)
const is404 = computed(() => code.value === 404)
const path = computed(() => route?.fullPath || '/')

useHead({ title: `${code.value} · Daniel Rodríguez Solarte` })

const goHome = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-bg px-6 py-16 text-ink">
    <!-- Tarjeta oscura: la "respuesta" del servidor al recurso inexistente -->
    <div
      class="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#1c241c] bg-[#0c100c] p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]"
    >
      <div
        class="pointer-events-none absolute -top-1/2 -right-[15%] h-72 w-72 rounded-full"
        style="background: radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 65%)"
      />

      <div class="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <span class="font-mono text-[0.78rem] font-medium text-[#e8eae5]">Daniel Andres Rodriguez</span>
        <span class="flex items-center gap-1.5 font-mono text-[0.7rem] font-semibold text-[#f87171]">
          <span class="h-1.5 w-1.5 rounded-full bg-[#f87171] shadow-[0_0_8px_#f87171]" />
          {{ code }}
        </span>
      </div>

      <div class="space-y-1.5 font-mono text-[0.8rem] leading-relaxed">
        <p class="truncate text-[#f0f2ed]/50">
          <span class="text-[#34d399]">$</span> GET {{ path }}
        </p>
        <p class="text-[#f0f2ed]">
          HTTP/1.1 <span class="text-[#f87171]">{{ code }}</span>
          {{ is404 ? 'Not Found' : 'Error' }}
        </p>
        <p class="pt-1 text-[#f0f2ed]/35">
          # {{ is404 ? t('error.notFoundText') : t('error.genericText') }}
        </p>
      </div>
    </div>

    <!-- Invitación a volver -->
    <button
      type="button"
      class="mt-7 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-sm text-bg transition-colors hover:bg-accent"
      @click="goHome"
    >
      <span>←</span> {{ t('error.home') }}
    </button>

    <!-- Accesos directos a secciones -->
    <p class="mt-10 mb-4 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-dim">
      {{ t('error.explore') }}
    </p>
    <nav
      class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
      aria-label="Secciones"
    >
      <NuxtLink
        v-for="section in NAV_SECTIONS"
        :key="section.id"
        :to="`${localePath('/')}#${section.id}`"
        class="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent"
      >
        {{ section.num }} · {{ t(`nav.${section.id}`) }}
      </NuxtLink>
    </nav>
  </div>
</template>
