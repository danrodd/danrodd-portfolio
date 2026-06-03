<script setup lang="ts">
import { FileText, Mail } from 'lucide-vue-next'
import { SITE_CONTACT } from '~/data/site'

/**
 * Pie del sidebar: separador + fila de social (email, WhatsApp, GitHub,
 * LinkedIn, CV) y los controles de idioma y tema.
 * Los logos de marca son SVG inline (lucide ya no los trae).
 */
const { t } = useI18n()
</script>

<template>
  <div class="mt-10 flex flex-col gap-5 border-t border-line pt-5">
    <ul class="flex items-center gap-4">
      <li>
        <a
          :href="`mailto:${SITE_CONTACT.email}`"
          aria-label="Email"
          class="text-muted transition-colors hover:text-accent"
        >
          <Mail :size="20" />
        </a>
      </li>
      <li>
        <a
          :href="SITE_CONTACT.whatsapp"
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
          :href="SITE_CONTACT.github"
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
          :href="SITE_CONTACT.linkedin"
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
          href="/cv.pdf"
          target="_blank"
          rel="noopener"
          :aria-label="`${t('a11y.downloadCv')} ${t('a11y.newTab')}`"
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
