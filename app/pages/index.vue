<script setup lang="ts">
/**
 * Home: apila las secciones de lectura en el orden de NAV_SECTIONS.
 * El contenido personal (about, experiencia, trabajo, decisiones) es placeholder
 * hasta validar la información real; stack es real. Cada sección renderiza su
 * propio <section :id> para que el scroll-spy del diagrama funcione.
 */
</script>

<template>
  <div class="py-14">
    <SectionAbout />
    <SectionExperience />
    <SectionWork />
    <SectionDecisions />
    <SectionStack />
    <SectionNow />
    <TheColophon />
  </div>
</template>
