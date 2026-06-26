<script setup lang="ts">
import { FileText, Mail } from 'lucide-vue-next'
import { CONTACT } from '~/data/contact'

/**
 * Pie del sidebar: separador + fila de social (email, WhatsApp, GitHub,
 * LinkedIn, CV) y los controles de idioma y tema. Datos en data/contact.ts.
 * Los logos de marca son SVG inline (lucide ya no los trae).
 */
const { t } = useI18n()

// WhatsApp con mensaje prellenado bilingüe (?text=…), codificado para la URL.
const whatsappUrl = computed(
  () => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t('contact.whatsapp'))}`
)
</script>

<template>
  <div class="mt-10 flex flex-col gap-5 border-t border-line pt-5">
    <ul class="flex items-center gap-4">
      <li>
        <a
          :href="`mailto:${CONTACT.email}`"
          aria-label="Email"
          class="text-muted transition-colors hover:text-accent"
        >
          <Mail :size="20" />
        </a>
      </li>
      <li>
        <a
          :href="whatsappUrl"
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
          :href="CONTACT.github"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          class="text-muted transition-colors hover:text-accent"
        >
          <IconGithub />
        </a>
      </li>
      <li>
        <a
          :href="CONTACT.linkedin"
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn"
          class="text-muted transition-colors hover:text-accent"
        >
          <IconLinkedin />
        </a>
      </li>
      <li>
        <a
          :href="CONTACT.cv"
          target="_blank"
          rel="noopener"
          aria-label="Ver CV"
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
</template>
