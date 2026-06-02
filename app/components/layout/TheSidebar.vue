<script setup lang="ts">
import { FileText, Mail } from 'lucide-vue-next'
import { NAV_SECTIONS } from '~/data/nav'

// Íconos de marca inline (lucide ya no los trae): <IconGithub />, <IconLinkedin />, <IconWhatsapp />

/**
 * Columna izquierda fija (placeholder de Fase 0).
 * Pendiente Fase 3: reemplazar la nav de texto por el diagrama SVG navegable
 * con scroll-spy. El avatar muestra iniciales hasta tener la foto real (assets/daniel.jpg).
 */
const { t } = useI18n()
</script>

<template>
  <aside class="flex h-full flex-col justify-between py-14">
    <!-- Identidad -->
    <div>
      <figure
        class="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[18px] bg-gradient-to-br from-accent to-[#0284c7] font-mono text-2xl font-bold text-white"
        aria-hidden="true"
      >
        DR
      </figure>

      <h1 class="text-[2rem] font-bold leading-none tracking-tight text-ink">
        Daniel Rodríguez<br>
        <span class="ital text-[1.6rem]">Solarte</span>
      </h1>

      <p class="mt-4 font-mono text-xs lowercase tracking-wide text-accent">
        {{ t('role') }}
      </p>

      <p class="mt-4 max-w-xs text-sm leading-relaxed text-muted">
        {{ t('pitch') }}
      </p>
    </div>

    <!-- Navegación (texto por ahora; diagrama SVG en Fase 3) -->
    <nav class="mt-10 flex flex-col gap-1.5" aria-label="Secciones">
      <a
        v-for="section in NAV_SECTIONS"
        :key="section.id"
        :href="`#${section.id}`"
        class="group flex items-center gap-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-dim transition-colors hover:text-ink"
      >
        <span class="h-px w-8 bg-dim transition-all group-hover:w-14 group-hover:bg-ink" />
        <span>{{ section.num }} · {{ t(`nav.${section.id}`) }}</span>
      </a>
    </nav>

    <!-- Footer: separador + social + controles -->
    <div class="mt-10 flex flex-col gap-5 border-t border-line pt-5">
      <ul class="flex items-center gap-4">
        <li>
          <a
            href="mailto:daniel@example.dev"
            aria-label="Email"
            class="text-muted transition-colors hover:text-accent"
          >
            <Mail :size="20" />
          </a>
        </li>
        <li>
          <a
            href="https://wa.me/57"
            target="_blank"
            rel="noopener"
            aria-label="WhatsApp"
            class="text-muted transition-colors hover:text-accent"
          >
            <IconWhatsapp />
          </a>
        </li>
        <li>
          <a
            href="#"
            aria-label="GitHub"
            class="text-muted transition-colors hover:text-accent"
          >
            <IconGithub />
          </a>
        </li>
        <li>
          <a
            href="#"
            aria-label="LinkedIn"
            class="text-muted transition-colors hover:text-accent"
          >
            <IconLinkedin />
          </a>
        </li>
        <li>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener"
            aria-label="Descargar CV (PDF)"
            class="text-muted transition-colors hover:text-accent"
          >
            <FileText :size="20" />
          </a>
        </li>
      </ul>

      <div class="flex items-center gap-2">
        <LangToggle />
        <ThemeToggle />
      </div>
    </div>
  </aside>
</template>
